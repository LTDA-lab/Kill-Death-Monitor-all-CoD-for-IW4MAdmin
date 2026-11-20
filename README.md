# KillDeathMonitor

A lightweight IW4MAdmin plugin that provides real-time kill and death notifications directly to players in-game.

Whenever a player eliminates another player, both receive a personalized notification displaying the killer, victim, and weapon used.

Features

- Real-time kill notifications.
- Personalized messages for both killer and victim.
- Weapon name detection and normalization.
- Clean and readable in-game messages.
- Lightweight implementation with minimal overhead.
- Designed for seamless integration with IW4MAdmin.

Installation

1. Download the "KillDeathMonitor.js" file.
2. Copy the file into your IW4MAdmin plugins directory.
3. Restart IW4MAdmin to load the plugin.
4. Join your server and test the kill notifications.


# KillDeathMonitor – Server Selector

KillDeathMonitor with server selection support for IW4MAdmin. Displays real-time kill and death notifications, including weapon information, exclusively on the selected game server.

## Features

- Real-time kill and death notifications.
- Displays the weapon used for each kill.
- Supports server selection by port.
- Prevents notifications from appearing on other monitored servers.
- Lightweight and easy to configure.

## Installation

1. Copy `KillDeathMonitor-ServerSelector.js` into your IW4MAdmin plugins directory.
2. Open the plugin file.
3. Locate the following line:

```javascript
if (Number(server.Port) !== 28973) return;
```

4. Replace `28973` with the port of the server where you want the plugin to operate.
5. Save the file.
6. Restart IW4MAdmin or reload the plugin.

## Configuration Example

To enable the plugin exclusively on port `28973`:

```javascript
if (Number(server.Port) !== 28973) return;
```

To use another server, simply change `28973` to its corresponding port.

**Note:** Only the selected server will generate kill and death notifications. All other servers monitored by IW4MAdmin will ignore this plugin's events.

## Author

LTDA-lab


Note: Make sure JavaScript plugin support is enabled and your IW4MAdmin installation supports the plugin API used by this script.

Author & Version

- Author: LTDA-lab
- Version: 1.5
- Plugin: KillDeathMonitor

Simple, lightweight, and informative — keeping players aware of every kill in the match.

Preview

<img width="446" height="334" alt="698136389-325768f0-abc1-420a-9093-f6904d073439" src="https://github.com/user-attachments/assets/6c5f8911-4c3e-4bde-8c51-db549e27f64a" />




