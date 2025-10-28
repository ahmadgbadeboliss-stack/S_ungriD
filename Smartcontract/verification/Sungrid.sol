// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title SunGridEnergyToken
 * @dev Token representing 1 kWh of verified solar energy
 */
contract SunGridEnergyToken {
    string public constant name = "SunGrid Energy Token";
    string public constant symbol = "SET";
    uint8 public constant decimals = 18;
    
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    address public owner;
    
    // Authorized minters (IoT devices/oracles)
    mapping(address => bool) public authorizedMinters;
    
    // Energy verification data
    struct EnergyRecord {
        uint256 timestamp;
        uint256 kWhAmount;
        string deviceId;
        bytes32 hcsTopicId;
    }
    
    mapping(address => EnergyRecord[]) public userEnergyRecords;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event EnergyTokenized(address indexed producer, uint256 amount, string deviceId, bytes32 hcsTopicId);
    event MinterAuthorized(address indexed minter);
    event MinterRevoked(address indexed minter);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    modifier onlyAuthorizedMinter() {
        require(authorizedMinters[msg.sender], "Not authorized minter");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        authorizedMinters[msg.sender] = true;
        emit OwnershipTransferred(address(0), msg.sender);
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    
    function authorizeMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = true;
        emit MinterAuthorized(minter);
    }
    
    function revokeMinter(address minter) external onlyOwner {
        authorizedMinters[minter] = false;
        emit MinterRevoked(minter);
    }
    
    /**
     * @dev Mint tokens when energy is verified
     * @param producer Address of energy producer
     * @param kWhAmount Amount of energy in kWh
     * @param deviceId IoT device identifier
     * @param hcsTopicId Hedera Consensus Service topic ID for verification
     */
    function mintEnergy(
        address producer,
        uint256 kWhAmount,
        string memory deviceId,
        bytes32 hcsTopicId
    ) external onlyAuthorizedMinter returns (uint256) {
        require(producer != address(0), "Invalid producer");
        require(kWhAmount > 0, "Amount must be positive");
        
        uint256 tokenAmount = kWhAmount * 10**decimals; // 1 SET = 1 kWh
        
        _totalSupply += tokenAmount;
        _balances[producer] += tokenAmount;
        
        userEnergyRecords[producer].push(EnergyRecord({
            timestamp: block.timestamp,
            kWhAmount: kWhAmount,
            deviceId: deviceId,
            hcsTopicId: hcsTopicId
        }));
        
        emit Transfer(address(0), producer, tokenAmount);
        emit EnergyTokenized(producer, kWhAmount, deviceId, hcsTopicId);
        
        return tokenAmount;
    }
    
    function totalSupply() external view returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }
    
    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }
    
    function allowance(address ownerAddr, address spender) external view returns (uint256) {
        return _allowances[ownerAddr][spender];
    }
    
    function approve(address spender, uint256 amount) external returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 currentAllowance = _allowances[from][msg.sender];
        require(currentAllowance >= amount, "Insufficient allowance");
        
        _transfer(from, to, amount);
        _approve(from, msg.sender, currentAllowance - amount);
        return true;
    }
    
    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "Transfer from zero address");
        require(to != address(0), "Transfer to zero address");
        require(_balances[from] >= amount, "Insufficient balance");
        
        _balances[from] -= amount;
        _balances[to] += amount;
        emit Transfer(from, to, amount);
    }
    
    function _approve(address ownerAddr, address spender, uint256 amount) internal {
        require(ownerAddr != address(0), "Approve from zero address");
        require(spender != address(0), "Approve to zero address");
        
        _allowances[ownerAddr][spender] = amount;
        emit Approval(ownerAddr, spender, amount);
    }
    
    function getUserEnergyRecords(address user) external view returns (EnergyRecord[] memory) {
        return userEnergyRecords[user];
    }
}

/**
 * @title SunGridMarketplace
 * @dev Peer-to-peer energy token marketplace with escrow
 */
contract SunGridMarketplace {
    SunGridEnergyToken public energyToken;
    address public owner;
    bool public paused;
    
    uint256 public listingCounter;
    uint256 public platformFeePercent = 25; // 0.25% (basis points: 25/10000)
    
    enum ListingStatus { Active, Sold, Cancelled }
    
    struct Listing {
        uint256 listingId;
        address seller;
        uint256 tokenAmount;
        uint256 pricePerKwh; // in tinybars (1 HBAR = 100,000,000 tinybars)
        ListingStatus status;
        uint256 createdAt;
    }
    
    struct Trade {
        uint256 tradeId;
        uint256 listingId;
        address buyer;
        address seller;
        uint256 tokenAmount;
        uint256 totalPrice; // in tinybars
        uint256 timestamp;
        bytes32 hcsRecordId;
    }
    
    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Trade) public trades;
    
    uint256 public tradeCounter;
    
    // Reentrancy guard
    uint256 private _status;
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    
    event ListingCreated(uint256 indexed listingId, address indexed seller, uint256 tokenAmount, uint256 pricePerKwh);
    event ListingCancelled(uint256 indexed listingId);
    event TradeExecuted(uint256 indexed tradeId, uint256 indexed listingId, address indexed buyer, address seller, uint256 amount, uint256 priceInHBAR);
    event PlatformFeeUpdated(uint256 newFee);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
    
    modifier nonReentrant() {
        require(_status != _ENTERED, "Reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
    
    constructor(address _energyTokenAddress) {
        energyToken = SunGridEnergyToken(_energyTokenAddress);
        owner = msg.sender;
        _status = _NOT_ENTERED;
        emit OwnershipTransferred(address(0), msg.sender);
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    
    /**
     * @dev Create a new energy listing
     * @param tokenAmount Amount of energy tokens to sell
     * @param pricePerKwh Price per kWh in wei (1 HBAR = 10^18 wei)
     */
    function createListing(
        uint256 tokenAmount,
        uint256 pricePerKwh
    ) external whenNotPaused returns (uint256) {
        require(tokenAmount > 0, "Amount must be positive");
        require(pricePerKwh > 0, "Price must be positive");
        
        // Transfer tokens to escrow
        require(
            energyToken.transferFrom(msg.sender, address(this), tokenAmount),
            "Token transfer failed"
        );
        
        listingCounter++;
        
        listings[listingCounter] = Listing({
            listingId: listingCounter,
            seller: msg.sender,
            tokenAmount: tokenAmount,
            pricePerKwh: pricePerKwh,
            status: ListingStatus.Active,
            createdAt: block.timestamp
        });
        
        emit ListingCreated(listingCounter, msg.sender, tokenAmount, pricePerKwh);
        
        return listingCounter;
    }
    
    /**
     * @dev Cancel a listing and return tokens
     */
    function cancelListing(uint256 listingId) external nonReentrant {
        Listing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not the seller");
        require(listing.status == ListingStatus.Active, "Listing not active");
        
        listing.status = ListingStatus.Cancelled;
        
        require(
            energyToken.transfer(listing.seller, listing.tokenAmount),
            "Token return failed"
        );
        
        emit ListingCancelled(listingId);
    }
    
    /**
     * @dev Buy energy tokens from a listing with HBAR
     * @param listingId ID of the listing to buy from
     * @param hcsRecordId Hedera Consensus Service record ID for audit trail
     */
    function buyEnergy(uint256 listingId, bytes32 hcsRecordId) 
        external 
        payable 
        nonReentrant 
        whenNotPaused 
        returns (uint256) 
    {
        Listing storage listing = listings[listingId];
        require(listing.status == ListingStatus.Active, "Listing not active");
        require(msg.sender != listing.seller, "Cannot buy own listing");
        
        // Calculate total price in HBAR
        uint256 kWhAmount = listing.tokenAmount / (10**18);
        uint256 totalPrice = kWhAmount * listing.pricePerKwh;
        uint256 platformFee = (totalPrice * platformFeePercent) / 10000;
        uint256 sellerAmount = totalPrice - platformFee;
        
        require(msg.value >= totalPrice, "Insufficient HBAR payment");
        
        // Transfer HBAR payment to seller
        (bool success, ) = payable(listing.seller).call{value: sellerAmount}("");
        require(success, "HBAR payment to seller failed");
        
        // Refund excess HBAR if any
        if (msg.value > totalPrice) {
            (bool refundSuccess, ) = payable(msg.sender).call{value: msg.value - totalPrice}("");
            require(refundSuccess, "HBAR refund failed");
        }
        
        // Transfer energy tokens to buyer
        require(
            energyToken.transfer(msg.sender, listing.tokenAmount),
            "Token transfer to buyer failed"
        );
        
        listing.status = ListingStatus.Sold;
        
        tradeCounter++;
        trades[tradeCounter] = Trade({
            tradeId: tradeCounter,
            listingId: listingId,
            buyer: msg.sender,
            seller: listing.seller,
            tokenAmount: listing.tokenAmount,
            totalPrice: totalPrice,
            timestamp: block.timestamp,
            hcsRecordId: hcsRecordId
        });
        
        emit TradeExecuted(tradeCounter, listingId, msg.sender, listing.seller, listing.tokenAmount, totalPrice);
        
        return tradeCounter;
    }
    
    /**
     * @dev Get active listings (view function for frontend)
     */
    function getActiveListing(uint256 listingId) external view returns (Listing memory) {
        return listings[listingId];
    }
    
    /**
     * @dev Get trade details
     */
    function getTrade(uint256 tradeId) external view returns (Trade memory) {
        return trades[tradeId];
    }
    
    /**
     * @dev Update platform fee (max 5%)
     */
    function updatePlatformFee(uint256 newFeePercent) external onlyOwner {
        require(newFeePercent <= 500, "Fee too high"); // Max 5%
        platformFeePercent = newFeePercent;
        emit PlatformFeeUpdated(newFeePercent);
    }
    
    /**
     * @dev Emergency pause
     */
    function pause() external onlyOwner {
        paused = true;
    }
    
    function unpause() external onlyOwner {
        paused = false;
    }
    
    /**
     * @dev Withdraw accumulated platform fees in HBAR
     */
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev Get listing price for a specific amount
     */
    function calculatePrice(uint256 listingId) external view returns (uint256 totalPrice, uint256 platformFee, uint256 sellerAmount) {
        Listing memory listing = listings[listingId];
        uint256 kWhAmount = listing.tokenAmount / (10**18);
        totalPrice = kWhAmount * listing.pricePerKwh;
        platformFee = (totalPrice * platformFeePercent) / 10000;
        sellerAmount = totalPrice - platformFee;
    }
}

/**
 * @title IERC20 Interface
 */
interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

/**
 * @title SunGridRewards
 * @dev Carbon credits and eco-rewards system
 */
contract SunGridRewards {
    SunGridEnergyToken public energyToken;
    SunGridMarketplace public marketplace;
    address public owner;
    
    struct UserStats {
        uint256 totalEnergyProduced;
        uint256 totalEnergyTraded;
        uint256 carbonCredits;
        uint256 ecoPoints;
        uint256 lastRewardClaim;
    }
    
    mapping(address => UserStats) public userStats;
    
    uint256 public carbonCreditRate = 1; // 1 credit per 10 kWh
    uint256 public ecoPointsRate = 10; // 10 points per kWh traded
    
    event CarbonCreditsIssued(address indexed user, uint256 amount);
    event EcoPointsAwarded(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 carbonCredits, uint256 ecoPoints);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }
    
    constructor(address _energyTokenAddress, address _marketplaceAddress) {
        energyToken = SunGridEnergyToken(_energyTokenAddress);
        marketplace = SunGridMarketplace(_marketplaceAddress);
        owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    
    /**
     * @dev Update user stats after energy production
     */
    function recordEnergyProduction(address producer, uint256 kWhAmount) external {
        require(msg.sender == address(energyToken), "Only token contract");
        
        userStats[producer].totalEnergyProduced += kWhAmount;
        
        // Issue carbon credits (1 credit per 10 kWh)
        uint256 creditsEarned = kWhAmount / 10;
        if (creditsEarned > 0) {
            userStats[producer].carbonCredits += creditsEarned;
            emit CarbonCreditsIssued(producer, creditsEarned);
        }
    }
    
    /**
     * @dev Update user stats after trade
     */
    function recordTrade(address seller, address buyer, uint256 kWhAmount) external {
        require(msg.sender == address(marketplace), "Only marketplace");
        
        userStats[seller].totalEnergyTraded += kWhAmount;
        
        // Award eco points
        uint256 pointsEarned = kWhAmount * ecoPointsRate;
        userStats[seller].ecoPoints += pointsEarned;
        
        emit EcoPointsAwarded(seller, pointsEarned);
    }
    
    /**
     * @dev Get user sustainability stats
     */
    function getUserStats(address user) external view returns (UserStats memory) {
        return userStats[user];
    }
    
    /**
     * @dev Calculate total carbon offset in kg CO2
     */
    function calculateCarbonOffset(address user) external view returns (uint256) {
        // Average: 1 kWh solar = 0.5 kg CO2 saved
        return userStats[user].totalEnergyProduced * 500; // in grams
    }
    
    /**
     * @dev Update reward rates
     */
    function updateRewardRates(uint256 newCarbonRate, uint256 newEcoRate) external onlyOwner {
        carbonCreditRate = newCarbonRate;
        ecoPointsRate = newEcoRate;
    }
}