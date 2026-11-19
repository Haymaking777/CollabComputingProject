// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyData {

    struct Record {
        string deviceId;
        uint256 sensorData;
        string dataHash;
        uint256 timestamp;
    }

    Record[] public records;

    event DataStored(
        string deviceId,
        uint256 sensorData,
        string dataHash,
        uint256 timestamp
    );

    function storeData(
        string memory _deviceId,
        uint256 _sensorData,
        string memory _dataHash
    ) public {

        Record memory newRecord = Record({
            deviceId: _deviceId,
            sensorData: _sensorData,
            dataHash: _dataHash,
            timestamp: block.timestamp
        });

        records.push(newRecord);

        emit DataStored(
            _deviceId,
            _sensorData,
            _dataHash,
            block.timestamp
        );
    }

    function getRecord(uint256 index)
        public
        view
        returns (
            string memory,
            uint256,
            string memory,
            uint256
        )
    {
        Record memory r = records[index];

        return (
            r.deviceId,
            r.sensorData,
            r.dataHash,
            r.timestamp
        );
    }

    function getCount() public view returns (uint256) {
        return records.length;
    }
}