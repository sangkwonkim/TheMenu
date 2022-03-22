const { User: UserModel, AteMenu: AteMenuModel, Menu: MenuModel } = require('../models');

module.exports = {
  get: async (req, res) => {
    try {
      const styles = ['korean', 'japanese', 'chinese', 'western', 'others'];
      const types = ['rice', 'noodle', 'bread', 'others'];
      const query = req.query;
      const spicy = query.spicy;
      const meat = query.meat;
      const soup = query.soup;
      const style = query.style;
      const type = query.type;
      if (spicy && Number.isNaN(parseInt(spicy, 10))) return res.status(400).json({ message: 'spicy 요청이 잘 못 되었습니다.' });
      if (meat && Number.isNaN(parseInt(meat, 10))) return res.status(400).json({ message: 'meat 요청이 잘 못 되었습니다.' });
      if (soup && Number.isNaN(parseInt(soup, 10))) return res.status(400).json({ message: 'soup 요청이 잘 못 되었습니다.' });
      if (style && !styles.includes(style)) return res.status(400).json({ message: 'style 요청이 잘 못 되었습니다.' });
      if (type && !types.includes(type)) return res.status(400).json({ message: 'type 요청이 잘 못 되었습니다.' });

      const findMenus = await MenuModel.findAll({
        where: req.query,
        attributes: ['id', 'name'],
        order: [['id', 'ASC']]
      });
      if (findMenus.length === 0) return res.status(404).json({ message: '조건에 충족하는 메뉴가 존재하지 않습니다.' }); // 클라이언트에서 처리할 지 여부에 대해서는 고민해보기
      res.status(200).json({ menus: findMenus });
    } catch {
      res.status(500).json({ message: '메뉴 찾기에 실패했습니다.' });
    }
  },
  post: async (req, res) => {
    try {
      const user_Id = parseInt(req.params.user_Id, 10);
      if (Number.isNaN(user_Id)) return res.status(400).json({ message: '요청이 잘 못 되었습니다.' });
      const menu_Id = parseInt(req.query.menu_Id, 10);
      if (Number.isNaN(menu_Id)) return res.status(400).json({ message: '요청이 잘 못 되었습니다.' });
      const findUser = await UserModel.findOne({
        where: { email: req.decoded.email },
        attributes: ['id']
      });
      if (!findUser) return res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
      if (user_Id !== findUser.id) return res.status(403).json({ message: '본인만 메뉴를 저장할 수 있습니다.' });
      const createAteMenu = await AteMenuModel.create({
        user: findUser.id,
        menu: menu_Id,
        createdAt: new Date()
      });
      res.status(201).json({ message: '메뉴 저장에 성공했습니다.' });
    } catch {
      res.status(500).json({ message: '메뉴 저장에 실패했습니다.' });
    }
  },
  myMenu: async (req, res) => {
    try {
      const user_Id = parseInt(req.params.user_Id, 10);
      if (Number.isNaN(user_Id)) return res.status(400).json({ message: '요청이 잘 못 되었습니다.' });
      const findUser = await UserModel.findOne({
        where: { email: req.decoded.email },
        attributes: ['id']
      });
      if (!findUser) return res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
      if (user_Id !== findUser.id) return res.status(403).json({ message: '본인만 메뉴를 확인할 수 있습니다.' });
      const findMenus = await MenuModel.findAll({
        attributes: ['name'],
        raw: true,
        include: [{
          model: AteMenuModel,
          order: [['createdAt', 'DESC']],
          attributes: { exclude: ['id', 'user', 'menu', 'createdAt'] },
          where: { user: findUser.id }
        }]
      });
      if (findMenus.length === 0) return res.status(404).json({ message: '사용자가 저장한 메뉴가 존재하지 않습니다.' }); // 클라이언트에서 처리할 지 여부에 대해서는 고민해보기
      res.status(200).json({ menus: findMenus });
    } catch {
      res.status(500).json({ message: '사용자 메뉴 찾기에 실패했습니다.' });
    }
  }
};
