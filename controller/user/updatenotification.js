const { Notifications } = require("../../models");

async function updateNotification(req, res) {
  try {
    let userData = req.userData;

    let clickedNotif = req.params.id;
    let notification = await Notifications.findByPk(clickedNotif);

    if (notification.is_read == false) {
      if (notification.user_id == userData.id) {
        await Notifications.update(
          {
            is_read: true,
          },
          {
            where: {
              id: notification.id,
            },
          }
        );

        res.json({
          message: "Update notifikasi berhasil",
        });
      } else {
        res.json({
          message: "Tidak bisa mengupdate notifikasi orang lain",
        });
      }
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = updateNotification;
