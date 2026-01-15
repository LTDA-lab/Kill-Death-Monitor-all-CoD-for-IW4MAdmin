plugin = {
    author: "LTDA-lab",
    version: 1.2,
    name: "KillDeathMonitor",

    config: {
        killMessage: "^2You ^7killed ^1{targetName}",
        deathMessage: "^1{originName} ^7killed ^2You"
    },

    onEventAsync: function (gameEvent, server) {
        if (!gameEvent || !server) return;

        if (gameEvent.Type === 303) {
            var origin = gameEvent.Origin;
            var target = gameEvent.Target;

            if (!origin || !target || !server.Clients.includes(origin) || !server.Clients.includes(target) || origin.Id === target.Id) return;

            try {
                var killMessage = this.config.killMessage.replace('{targetName}', target.Name);
                var deathMessage = this.config.deathMessage.replace('{originName}', origin.Name);

                origin.Tell(killMessage);
                target.Tell(deathMessage);
            } catch (ex) {
                if (server.Logger && typeof server.Logger.WriteWarning === 'function') {
                    server.Logger.WriteWarning('Error processing death event: ' + ex.message);
                }
            }
        }
    },

    onLoadAsync: function (manager) { },
    onUnloadAsync: function () { },
    onTickAsync: function (server) { }
};