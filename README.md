# KillDeathMonitor

## Description

KillDeathMonitor is a plugin for IW4MAdmin that provides real-time, customizable kill and death messages to players in-game. When a player gets a kill or is killed, this plugin displays a message to both the killer and the victim.

## Features

- **Customizable Messages:** Easily change the kill and death messages to your liking.
- **Real-Time Notifications:** Informs players instantly of kills and deaths.
- **Suicide Prevention:** Does not display messages for suicides.

## Installation

1.  Place the `KillDeathMonitor.js` file into the `Plugins` folder of your IW4MAdmin installation.
2.  Restart IW4MAdmin.

## Configuration

You can customize the kill and death messages by editing the `config` section in the `KillDeathMonitor.js` file.

```javascript
config: {
    killMessage: "^2You ^7killed ^1{targetName}",
    deathMessage: "^1{originName} ^7killed ^2You"
},
```

-   `killMessage`: The message shown to the killer. `{targetName}` is a placeholder for the victim's name.
-   `deathMessage`: The message shown to the victim. `{originName}` is a placeholder for the killer's name.

