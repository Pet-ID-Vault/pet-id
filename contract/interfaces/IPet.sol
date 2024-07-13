// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.13 <0.9.0;

import "@fhenixprotocol/contracts/FHE.sol";

interface IPet {

    enum Gender {
        MALE,
        FEMALE
    }

    struct InPetAttribute {
        inEuint256 key;
        inEuint256[] value;
    }

    struct OutPetAttribute {
        bytes32 key;
        string value;
    }

    struct PetAttribute {
        euint256 key;
        euint256[] value;
    }

    struct PetStruct {
        uint256 id;
        address owner;
        bytes32 name;
        bytes32 breed;
        Gender gender;
        bool pedigree;
        euint256 breeder;
        euint256 vaccines;
        PetAttribute[] attributes;
    }

    struct OutPetStruct {
        uint256 id;
        address owner;
        bytes32 name;
        bytes32 breed;
        Gender gender;
        bool pedigree;
        bytes32 breeder;
        uint256 vaccines;
        OutPetAttribute[] attributes;
    }

    struct InOwnerStruct {
        inEuint256 physicalAddress;
        inEuint256 name;
        inEuint256 phoneNumber;
        inEuint256 emailAddress;
        inEuint256 emailDomain;
        bool isReachable;
    }

    struct OutOwnerStruct {
        bytes32 physicalAddress;
        bytes32 name;
        bytes32 phoneNumber;
        bytes32 emailAddress;
        bytes32 emailDomain;
        bool isReachable;
    }

    struct OwnerStruct {
        euint256 physicalAddress;
        euint256 name;
        euint256 phoneNumber;
        euint256 emailAddress;
        euint256 emailDomain;
        bool isReachable;
    }

    function registerPet(
        bytes32 publicUuid,
        bytes32 name,
        bytes32 breed,
        Gender gender,
        bool pedigree,
        inEuint256 calldata breeder,
        inEuint256 calldata vaccines,
        InPetAttribute[] calldata attributes
    ) external;

    function updatePetInfo(
        bytes32 publicUuid,
        bytes32 name,
        bytes32 breed,
        Gender gender,
        bool pedigree,
        inEuint256 calldata breeder,
        inEuint256 calldata vaccines,
        InPetAttribute[] calldata attributes
    ) external;

    function updateOwnerData(InOwnerStruct memory) external;

    function reportLostPet(bytes32 publicUuid) external;

    function readPetData(bytes32 publicUuid) external view returns(OutPetStruct memory);

    function readOwnerData(address owner) external view returns(OutOwnerStruct memory);

    event NewPet(uint256 indexed id, bytes32 indexed publicUuid);

    event PetUpdate(bytes32 indexed publicUuid);

    event OwnerUpdate(address indexed owner);

    event PetLost(bytes32 indexed publicUuid);

    event PetFound(bytes32 indexed publicUuid);

    error PetAlreadyRegistered();

    error NotPetOwner();

    error NotPermitted();
}
