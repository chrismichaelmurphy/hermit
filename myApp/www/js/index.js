/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var bluetoothDisabledElement;
var bluetoothDeviceUnbondedElement;
var bluetoothErrorElement;

const address = ""; // hard coded mac address

var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function () {
    this.receivedEvent("deviceready");
  },
  // Update DOM on a Received Event
  receivedEvent: function (id) {
    if (id === "deviceready") {
      connectViaBluetooth();
    }
  },
};

app.initialize();

function connectViaBluetooth() {
  bluetoothDisabledElement = document.getElementById("bluetooth_disabled");
  bluetoothDisabledElement.setAttribute("style", "display:none");
  bluetoothDeviceUnbondedElement = document.getElementById(
    "bluetooth_device_unbonded"
  );
  bluetoothDeviceUnbondedElement.setAttribute("style", "display:none");
  bluetootErrorElement = document.getElementById("bluetooth_error");
  bluetootErrorElement.setAttribute("style", "display:none");

  if (device.platform === "Android") {
    connectViaBluetoothFromAndroid();
  }
}

async function connectViaBluetoothFromAndroid() {
  new Promise(function (resolve) {
    bluetoothle.initialize(resolve, { request: true });
  }).then((initResult = {}) => {
    if (!["disabled", "enabled"].includes(initResult.status)) {
      handleError(new Error(`unknown init status ${initResult.status}`));
      return;
    }
    if (initResult.status === "disabled") {
      bluetoothDisabledElement.setAttribute("style", "display:block");
      return;
    }
    bluetoothle.isBonded(
      (isBondedResult) => {
        if (isBondedResult.isBonded) {
          continueWithBluetoothEnabledandDeviceBonded();
        } else {
          bluetoothle.bond(
            (bondResult) => {
              if (bondResult.status === "bonding") {
                return;
              } else if (bondResult.status === "bonded") {
                continueWithBluetoothEnabledandDeviceBonded();
              } else if (bondResult.status === "unbonded") {
                bluetoothDeviceUnbondedElement.setAttribute(
                  "style",
                  "display:block"
                );
                return;
              } else {
                handleError(
                  new Error(`unknown bond status ${bondResult.status}`)
                );
              }
            },
            (bondError) => {
              handleError(bondError);
            },
            { address }
          );
        }
      },
      (isBondedError) => {
        handleError(isBondedError);
      },
      { address }
    );
  }),
    (error) => {
      handleError(error);
    };
}

const continueWithBluetoothEnabledandDeviceBonded = () => {
  bluetoothle.connect(
    (connectResult) => {
      if (connectResult.status === "connected") {
        bluetoothle.discover(
          (discoverResult) => {},
          (discoverError) => {
            handleError(discoverError);
          },
          { address, clearCache: true }
        );
      }
    },
    (connectError) => {
      handleError(connectError);
    },
    { address, autoConnect: true }
  );
};

const handleError = (error) => {
  bluetootErrorElement.setAttribute("style", "display:block");
};
