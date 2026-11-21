plugin = {
    author: "LTDA-lab",
    version: 1.6,
    name: "KillDeathMonitor",

    onEventAsync: function (gameEvent, server) {
        if (!gameEvent || !server) return;
        if (gameEvent.Type !== 303) return;

        var origin = gameEvent.Origin;
        var target = gameEvent.Target;

        if (!origin || !target) return;
        if (!server.Clients.includes(origin) || !server.Clients.includes(target)) return;

        // --- Extraer arma y zona de impacto ---
        var weapon = null;
        var hitLoc = null;

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

            // Buscar hit location (head / helmet)
            if (typeof gameEvent.Data.HitLocation === "string")
                hitLoc = gameEvent.Data.HitLocation;
            else if (typeof gameEvent.Data.HitLoc === "string")
                hitLoc = gameEvent.Data.HitLoc;
            else if (typeof gameEvent.Data.sHitLoc === "string")
                hitLoc = gameEvent.Data.sHitLoc;
        }

        if (!weapon && typeof gameEvent.WeaponName === "string") weapon = gameEvent.WeaponName;
        if (!weapon && typeof gameEvent.Weapon === "string") weapon = gameEvent.Weapon;
        if (!hitLoc && typeof gameEvent.HitLocation === "string") hitLoc = gameEvent.HitLocation;

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

        // --- Verificar Headshot ---
        var headshotTag = "";
        if (hitLoc) {
            var cleanHit = String(hitLoc).trim().toLowerCase();
            if (cleanHit === "head" || cleanHit === "helmet") {
                headshotTag = " ^3[Headshot]";
            }
        }

        try {
            var originName = origin.Name || "Unknown";
            var targetName = target.Name || "Unknown";
            var w = weapon ? "^7[" + weapon + "]" : "^3[unknown]";

            // Quien mata
            origin.Tell("^2You ^7" + w + " ^1" + targetName + headshotTag);

            // Quien muere
            target.Tell("^1" + originName + " ^7" + w + " ^2you" + headshotTag);

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
