   // SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract RoleRegistry {
    enum Role { NONE, FARMER, INSPECTOR, DISTRIBUTOR, REGULATOR }

    address public immutable owner;
    mapping(address => Role) public roles;

    event RoleAssigned(address indexed account, Role role);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function assignRole(address account, Role role) external onlyOwner {
        require(account != address(0), "Zero address not allowed");
        roles[account] = role;
        emit RoleAssigned(account, role);
    }

    function hasRole(address account, Role role) external view returns (bool) {
        return roles[account] == role;
    }
}