const { User: UserModel, AteMenu : AteMenuModel, Menu: MenuModel} = require('../models');

module.exports = {
    get: async (req, res) => {
        try {
            const findMenus = await MenuModel.findAll({
                where : req.query,
                attributes : [ 'id', 'name' ],
                order: [['id', 'ASC']],
            });
            res.status(200).json({menus : findMenus})
        } catch {
            res.status(500).json({ message: '메뉴 찾기에 실패했습니다.' });
        }
    },
    post: (req, res) => {
        try {
            // 메뉴 저장
        } catch {
            
        }
    },
    myMenu: (req, res) => {
        try {
            // 내가 저장한 메뉴 보기
        } catch {
            
        }
    }
}