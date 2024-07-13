// SPDX-License-Identifier: MIT

pragma solidity >=0.8.13 <0.9.0;

import "@fhenixprotocol/contracts/FHE.sol";
import { IPet } from "../interfaces/IPet.sol";

contract Pet is IPet {
    address internal _origin;
    uint256 internal _counter;
    mapping(bytes32 => PetStruct) internal _pets;
    mapping(address => OwnerStruct) internal _owners;
    mapping(address => bool) internal _vets;

    constructor() {
        _origin = tx.origin;
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
    ) external {
        if (_pets[publicUuid].id > 0) {
            revert PetAlreadyRegistered();
        }

        unchecked { _counter++; }
        _setPetData(publicUuid, name, breed, gender, pedigree, breeder, vaccines, attributes);

        emit NewPet(_counter, publicUuid);
    }

    function updatePetInfo(
        bytes32 publicUuid,
        bytes32 name,
        bytes32 breed,
        Gender gender,
        bool pedigree,
        inEuint256 calldata breeder,
        inEuint256 calldata vaccines,
        InPetAttribute[] calldata attributes
    ) external {
        if (msg.sender != _pets[publicUuid].owner) {
            revert NotPetOwner();
        }

        _setPetData(publicUuid, name, breed, gender, pedigree, breeder, vaccines, attributes);

        emit PetUpdate(publicUuid);
    }

    function updateOwnerData(InOwnerStruct memory ownerData) external {
        _owners[msg.sender].name = FHE.asEuint256(ownerData.name);
        _owners[msg.sender].physicalAddress = FHE.asEuint256(ownerData.physicalAddress);
        _owners[msg.sender].phoneNumber = FHE.asEuint256(ownerData.phoneNumber);
        _owners[msg.sender].emailAddress = FHE.asEuint256(ownerData.emailAddress);
        _owners[msg.sender].emailDomain = FHE.asEuint256(ownerData.emailDomain);
        emit OwnerUpdate(msg.sender);
    }

    function reportLostPet(bytes32 publicUuid) external {
        _owners[msg.sender].isReachable = true;
        emit PetLost(publicUuid);
    }

    function reportFoundPet(bytes32 publicUuid) external {
        _owners[msg.sender].isReachable = false;
        emit PetFound(publicUuid);
    }

    function readPetData(bytes32 publicUuid) external view returns(OutPetStruct memory pet) {
        _assertIsPermittedPetData(msg.sender, publicUuid);

        pet = _decryptPetData(publicUuid);
    }

    function readOwnerData(address owner) external view returns(OutOwnerStruct memory) {
        return OutOwnerStruct({
            physicalAddress: bytes32(0),
            name: bytes32(0),
            phoneNumber: bytes32(0),
            emailAddress: bytes32(0),
            emailDomain: bytes32(0),
            isReachable: false
        });
    }

    function _setPetData(
        bytes32 publicUuid,
        bytes32 name,
        bytes32 breed,
        Gender gender,
        bool pedigree,
        inEuint256 calldata breeder,
        inEuint256 calldata vaccines,
        InPetAttribute[] calldata attributes
    ) internal {
        PetStruct storage pet = _pets[publicUuid];
        pet.id = _counter;
        pet.owner = msg.sender;
        pet.name = name;
        pet.breed = breed;
        pet.pedigree = pedigree;
        pet.breeder = FHE.asEuint256(breeder);
        pet.vaccines = FHE.asEuint256(vaccines);
        for (uint256 i = 0; i < attributes.length; ) {
            pet.attributes[i].key = FHE.asEuint256(attributes[i].key);
            for (uint256 j = 0; j < attributes[i].value.length; ) {
                pet.attributes[i].value[j] = FHE.asEuint256(attributes[i].value[j]);
                unchecked { j++; }
            }
            unchecked { i++; }
        }
    }

    function _assertIsPermittedPetData(address caller, bytes32 publicUuid) internal view {
        if (caller == _pets[publicUuid].owner) {
            return;
        }
        if (_vets[caller]) {
            return;
        }
        revert NotPermitted();
    }

    function _assertIsPermittedOwnerData(address caller, address owner) internal view {
        if (caller == owner) {
            return;
        }
        if (_vets[caller]) {
            return;
        }
        revert NotPermitted();
    }

    function _decryptPetData(bytes32 publicUuid) internal view returns(OutPetStruct memory pet) {
        OutPetAttribute[] memory attributes;
        PetStruct storage storedPet = _pets[publicUuid];
        pet = OutPetStruct({
            id: storedPet.id,
            owner: storedPet.owner,
            name: storedPet.name,
            breed: storedPet.breed,
            gender: storedPet.gender,
            pedigree: storedPet.pedigree,
            breeder: bytes32(FHE.decrypt(storedPet.breeder)),
            vaccines: FHE.decrypt(storedPet.vaccines),
            attributes: attributes
        });
    }
}

