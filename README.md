# firewalla-device-manager

## What is this project?

This project is intended to provide a Firewalla device list script so that you
can easily import custom names for your existing devices that your Firewalla is
aware of as a backup mechanism should you ever need to reset the device. Since
there's currently no way to export your current devices or Firewalla
configuration from the app or web interface, this project provides one mechanism
to do so, specifically for the device list.

Note that this project is not officially supported by either Firewalla and is
provided free of charge as open source software. Firewalla and the contributors
of this package provide no guarantees of compatibility or any other warranty if
you choose to use this software on your machine or Firewalla Gold unit.

## Installation

```bash
# Clone the repository on your machine
git clone https://github.com/mrodrig/firewalla-device-manager.git

cd firewalla-device-importer

# Install dependencies
npm install

# Edit the devices.csv file with your device names, MAC addresses, and IP reservations
vim devices.csv

# Run the importer
node import.js

# Done!
```

## How does this work?

This script leverages Firewalla's web interface API and makes the exact same
REST API calls that the web interface makes, as identified through a browser
network request logger.

Note that this has only been tested on renaming/updating settings for existing
devices and not has not been tested to see if it is able to add new devices to
the Firewalla device list that have not previously connected to your network.

## Contributing

I'm open to pull requests that improve the script logic, performance, and
reliability.
