"use client";

import { Post } from "@/types/post";
import { useQuery } from "@tanstack/react-query";

async function getPosts(): Promise<Post[]> {
    return [
        {
            id: "1",
            title: "Getting Started with Next.js 13",
            slug: "getting-started-with-nextjs-13",
            date: "2024-03-20",
            excerpt: "Learn how to build modern web applications with Next.js 13 and its new features.",
            content: "",
            image: "/next.js.jpg",
            readingTime: 5,
            author: {
                name: "Isaac Laurent",
                image: "/avatar.jpg"
            },
            tags: ["Next.js", "React", "Web Development"]
        },
        {
            id: "2",
            title: "Building Smart Contracts with Solidity",
            slug: "building-smart-contracts-with-solidity",
            date: "2024-03-18",
            excerpt: "A comprehensive guide to writing secure and efficient smart contracts using Solidity. Learn about contract security, gas optimization, and best practices for Ethereum development.",
            content: `# Building Smart Contracts with Solidity

## Introduction
Smart contracts are self-executing contracts with the terms of the agreement directly written into code. In this guide, we'll explore how to build secure and efficient smart contracts using Solidity.

## Development Environment Setup
\`\`\`bash
# Install Truffle
npm install -g truffle

# Create a new project
truffle init

# Install OpenZeppelin contracts
npm install @openzeppelin/contracts
\`\`\`

## Basic Contract Structure
\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SecureVault is ReentrancyGuard, Ownable {
    mapping(address => uint256) private balances;
    
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);
    
    function deposit() external payable nonReentrant {
        require(msg.value > 0, "Amount must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    function withdraw(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Withdraw(msg.sender, amount);
    }
}
\`\`\`

## Security Best Practices

### 1. Reentrancy Protection
\`\`\`solidity
// Vulnerable contract
contract Vulnerable {
    mapping(address => uint256) public balances;
    
    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0);
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success);
        
        balances[msg.sender] = 0; // Too late!
    }
}

// Secure contract
contract Secure {
    mapping(address => uint256) public balances;
    
    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0);
        
        balances[msg.sender] = 0; // Update state first
        
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success);
    }
}
\`\`\`

### 2. Access Control
\`\`\`solidity
contract AccessControl {
    mapping(address => bool) public isAdmin;
    mapping(address => bool) public isOperator;
    
    modifier onlyAdmin() {
        require(isAdmin[msg.sender], "Not admin");
        _;
    }
    
    modifier onlyOperator() {
        require(isOperator[msg.sender], "Not operator");
        _;
    }
    
    function addAdmin(address account) external onlyAdmin {
        isAdmin[account] = true;
    }
    
    function addOperator(address account) external onlyAdmin {
        isOperator[account] = true;
    }
}
\`\`\`

## Gas Optimization Techniques

### 1. Storage vs Memory
\`\`\`solidity
contract GasOptimization {
    // Expensive: Multiple storage reads
    function expensive() public view returns (uint256) {
        return balances[msg.sender] + balances[msg.sender];
    }
    
    // Optimized: Single storage read
    function optimized() public view returns (uint256) {
        uint256 balance = balances[msg.sender];
        return balance + balance;
    }
}
\`\`\`

### 2. Batch Operations
\`\`\`solidity
contract BatchOperations {
    mapping(address => uint256) public balances;
    
    // Gas efficient batch transfer
    function batchTransfer(
        address[] calldata recipients,
        uint256[] calldata amounts
    ) external {
        require(recipients.length == amounts.length, "Length mismatch");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            balances[recipients[i]] += amounts[i];
        }
    }
}
\`\`\`

## Testing and Deployment

### 1. Unit Testing with Truffle
\`\`\`javascript
const SecureVault = artifacts.require("SecureVault");

contract("SecureVault", accounts => {
    let vault;
    const [owner, user] = accounts;
    
    beforeEach(async () => {
        vault = await SecureVault.new();
    });
    
    it("should accept deposits", async () => {
        const amount = web3.utils.toWei("1", "ether");
        await vault.deposit({ from: user, value: amount });
        const balance = await vault.balances(user);
        assert.equal(balance.toString(), amount);
    });
});
\`\`\`

### 2. Deployment Script
\`\`\`javascript
const SecureVault = artifacts.require("SecureVault");

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(SecureVault);
    const vault = await SecureVault.deployed();
    console.log("Vault deployed at:", vault.address);
};
\`\`\`

## Advanced Patterns

### 1. Upgradeable Contracts
\`\`\`solidity
// Proxy contract
contract Proxy {
    address public implementation;
    address public admin;
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }
    
    function upgrade(address newImplementation) external onlyAdmin {
        implementation = newImplementation;
    }
    
    fallback() external payable {
        address _impl = implementation;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), _impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}
\`\`\`

### 2. Multi-Signature Wallets
\`\`\`solidity
contract MultiSigWallet {
    mapping(address => bool) public isOwner;
    uint256 public requiredSignatures;
    
    struct Transaction {
        address destination;
        uint256 value;
        bytes data;
        bool executed;
        uint256 numConfirmations;
    }
    
    mapping(uint256 => Transaction) public transactions;
    mapping(uint256 => mapping(address => bool)) public confirmations;
    
    event TransactionSubmitted(uint256 indexed txId);
    event TransactionConfirmed(uint256 indexed txId, address indexed owner);
    event TransactionExecuted(uint256 indexed txId, address indexed owner);
    
    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not owner");
        _;
    }
    
    function submitTransaction(
        address _destination,
        uint256 _value,
        bytes memory _data
    ) public onlyOwner returns (uint256 txId) {
        txId = addTransaction(_destination, _value, _data);
        confirmTransaction(txId);
    }
    
    function confirmTransaction(uint256 _txId) public onlyOwner {
        Transaction storage transaction = transactions[_txId];
        require(!transaction.executed, "Already executed");
        require(!confirmations[_txId][msg.sender], "Already confirmed");
        
        transaction.numConfirmations += 1;
        confirmations[_txId][msg.sender] = true;
        
        emit TransactionConfirmed(_txId, msg.sender);
        
        if (transaction.numConfirmations >= requiredSignatures) {
            executeTransaction(_txId);
        }
    }
}
\`\`\`

## Security Auditing

### 1. Common Vulnerabilities
- Reentrancy attacks
- Integer overflow/underflow
- Access control issues
- Unchecked external calls
- Front-running attacks

### 2. Audit Checklist
1. Code review
2. Automated testing
3. Formal verification
4. Penetration testing
5. Economic analysis

## Conclusion
Building secure smart contracts requires careful consideration of various factors. Always:
- Follow the checks-effects-interactions pattern
- Use established libraries like OpenZeppelin
- Implement comprehensive testing
- Consider professional audits
- Keep up with security best practices

## Resources
- [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Ethereum Security Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [Common Attack Vectors](https://swcregistry.io/)`,
            image: "/solidity.jpg",
            readingTime: 8,
            author: {
                name: "Isaac Laurent",
                image: "/avatar.jpg"
            },
            tags: ["Blockchain", "Solidity", "Smart Contracts", "Ethereum"]
        },
        {
            id: "3",
            title: "Mastering TypeScript for React Development",
            slug: "mastering-typescript-for-react",
            date: "2024-03-15",
            excerpt: "Learn how to leverage TypeScript to build more robust and maintainable React applications. Discover type safety, interfaces, and advanced TypeScript patterns for React development.",
            content: `# Mastering TypeScript for React Development

## Introduction
TypeScript brings static typing to JavaScript, making React applications more maintainable and less prone to runtime errors.

## Key Concepts
- Type Definitions
- Interfaces and Types
- Generics in React
- Type Guards
- Utility Types

## React-Specific Patterns
1. Component Props Typing
2. Hooks with TypeScript
3. Context API Types
4. Redux/State Management Types

## Best Practices
- Use strict mode
- Leverage type inference
- Create reusable type definitions
- Implement proper error boundaries

## Conclusion
TypeScript significantly improves the development experience and code quality in React applications.`,
            image: "/blog/typescript-react.jpg",
            readingTime: 6,
            author: {
                name: "Isaac Laurent",
                image: "/avatar.jpg"
            },
            tags: ["TypeScript", "React", "Web Development"]
        },
        {
            id: "4",
            title: "Docker for Development: Best Practices",
            slug: "docker-development-best-practices",
            date: "2024-03-12",
            excerpt: "Essential Docker practices for developers to streamline their development workflow. Learn about containerization, multi-stage builds, and Docker Compose for local development.",
            content: `# Docker for Development: Best Practices

## Introduction
Docker has revolutionized how we develop and deploy applications. This guide covers essential practices for using Docker in development.

## Key Topics
- Container Basics
- Multi-stage Builds
- Docker Compose
- Volume Management
- Network Configuration

## Development Workflow
1. Local Development Setup
2. Hot Reloading
3. Debugging
4. Testing in Containers

## Best Practices
- Use .dockerignore
- Implement health checks
- Optimize layer caching
- Security considerations

## Conclusion
Proper Docker usage can significantly improve development efficiency and deployment consistency.`,
            image: "/Docker.jpg",
            readingTime: 7,
            author: {
                name: "Isaac Laurent",
                image: "/avatar.jpg"
            },
            tags: ["Docker", "DevOps", "Development"]
        },
        {
            id: "5",
            title: "GraphQL vs REST: Making the Right Choice",
            slug: "graphql-vs-rest",
            date: "2024-03-10",
            excerpt: "A detailed comparison of GraphQL and REST APIs to help you choose the right approach for your project. Understand the trade-offs, use cases, and implementation considerations.",
            content: `# GraphQL vs REST: Making the Right Choice

## Introduction
Choosing between GraphQL and REST is a crucial architectural decision. This guide helps you make an informed choice.

## Comparison
- Data Fetching
- Caching
- Performance
- Development Experience
- Tooling Support

## Use Cases
1. When to Choose REST
2. When to Choose GraphQL
3. Hybrid Approaches
4. Migration Strategies

## Implementation Considerations
- Schema Design
- Security
- Performance Optimization
- Caching Strategies

## Conclusion
Both GraphQL and REST have their place in modern web development. Choose based on your specific needs and constraints.`,
            image: "/graphql.jpg",
            readingTime: 6,
            author: {
                name: "Isaac Laurent",
                image: "/avatar.jpg"
            },
            tags: ["GraphQL", "REST", "API Design", "Backend"]
        },
        {
            id: "6",
            title: "Building Scalable Applications with Node.js",
            slug: "scalable-applications-nodejs",
            date: "2024-03-08",
            excerpt: "Learn how to build and scale Node.js applications for high performance and reliability. Discover clustering, load balancing, and microservices architecture patterns.",
            content: `# Building Scalable Applications with Node.js

## Introduction
Node.js applications can scale to handle millions of requests. This guide covers essential patterns and practices for building scalable applications.

## Scaling Strategies
- Clustering
- Load Balancing
- Microservices
- Caching
- Database Optimization

## Performance Optimization
1. Memory Management
2. Async Operations
3. Error Handling
4. Monitoring and Logging

## Architecture Patterns
- Event-Driven Architecture
- Message Queues
- Service Discovery
- Circuit Breakers

## Conclusion
Building scalable Node.js applications requires careful planning and implementation of proven patterns and practices.`,
            image: "/node.js.jpg",
            readingTime: 7,
            author: {
                name: "Isaac Laurent",
                image: "/avatar.jpg"
            },
            tags: ["Node.js", "Backend", "Scalability"]
        }
    ];
}

export function usePosts() {
    return useQuery({
        queryKey: ["posts"],
        queryFn: getPosts
    });
} 