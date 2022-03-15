const { User: UserModel, AteMenu : AteMenuModel, Menu: MenuModel} = require('../models');

module.exports = {
    get: async (req, res) => {
        try {
            const styles = [ 'korean', 'japanese', 'chinese', 'western', 'others' ];
            const types = [ 'rice', 'noodle', 'bread', 'others' ];
            const query = req.query;
            const spicy = query.spicy;
            const meat = query.meat;
            const soup = query.soup;
            const style = query.style;
            const type = query.type;
            if(spicy && Number.isNaN(parseInt(spicy, 10))) return res.status(400).json({ message: 'spicy 요청이 잘 못 되었습니다.' });
            if(meat && Number.isNaN(parseInt(meat, 10))) return res.status(400).json({ message: 'meat 요청이 잘 못 되었습니다.' });
            if(soup && Number.isNaN(parseInt(soup, 10))) return res.status(400).json({ message: 'soup 요청이 잘 못 되었습니다.' });
            if(style && !styles.includes(style)) return res.status(400).json({ message : 'style 요청이 잘 못 되었습니다.'})
            if(type && !types.includes(type)) return res.status(400).json({ message : 'type 요청이 잘 못 되었습니다.'})

            const findMenus = await MenuModel.findAll({
                where : req.query,
                attributes : [ 'id', 'name' ],
                order: [['id', 'ASC']],
            });
            if( findMenus.length === 0 ) return res.status(404).json({ message: '조건에 충족하는 메뉴가 존재하지 않습니다.'});
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