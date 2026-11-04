plugin = {
    author: "LTDA-lab",
    version: 1.5,
    name: "KillDeathMonitor",

    onEventAsync: function (gameEvent, server) {
        if (!gameEvent || !server) return;
        if (gameEvent.Type !== 303) return;

        var origin = gameEvent.Origin;
        var target = gameEvent.Target;

        if (!origin || !target) return;
        if (!server.Clients.includes(origin) || !server.Clients.includes(target)) return;

        // --- Extraer arma ---
        var weapon = null;

        if (gameEvent.Data) {
            if (typeof gameEvent.Data.Weapon === "string" && gameEvent.Data.Weapon.length)
                weapon = gameEvent.Data.Weapon;
            else if (typeof gameEvent.Data.KillerWeapon === "string" && gameEvent.Data.KillerWeapon.length)
                weapon = gameEvent.Data.KillerWeapon;
            else {
                for (var key in gameEvent.Data) {
                    if (!gameEvent.Data.hasOwnProperty(key)) continue;
                    var val = gameEvent.Data[key];

                    if (typeof val === "string" && /weapon|mp_|_mp/i.test(val)) {
                        weapon = val;
                        break;
                    }
                }
            }
        }

        if (!weapon && typeof gameEvent.WeaponName === "string") weapon = gameEvent.WeaponName;
        if (!weapon && typeof gameEvent.Weapon === "string") weapon = gameEvent.Weapon;

        // --- Limpiar arma ---
        if (weapon) {
            weapon = String(weapon).trim().toLowerCase();

            var match = weapon.match(/^(.+?)_mp/);
            if (match) weapon = match[1];

            weapon = weapon.replace(/^_+|_+$/g, "");
        }

        var weaponMap = {
            "satchel_charge": "c4",
            "7": "mp7"
        };

        if (weapon && weaponMap[weapon]) weapon = weaponMap[weapon];

        try {
            var originName = origin.Name || "Unknown";
            var targetName = target.Name || "Unknown";
            var w = weapon ? "^7[" + weapon + "]" : "^3[unknown]";

            // Quien mata
            origin.Tell("^2You ^7" + w + " ^1" + targetName);

            // Quien muere
            target.Tell("^1" + originName + " ^7" + w + " ^2you");

        } catch (ex) {
            if (server.Logger && typeof server.Logger.WriteWarning === "function") {
                server.Logger.WriteWarning("KillDeathMonitor error: " + ex.message);
            }
        }
    },

    onLoadAsync: function () { },
    onUnloadAsync: function () { },
    onTickAsync: function () { }
};
