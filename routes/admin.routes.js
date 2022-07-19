const express = require('express');

const adminController = require('../controllers/admin/admin.controller');
const { isAuth } = require('../middleware/auth.middleware');

const adminRoutes = express.Router();

function isAdmin(req, res, next) {
  if (req.user.role === 'admin') {
      next();
		} else {
      console.log('Access Denied');
      res.redirect('/dashboard');
    }
}

// adminRoutes.use(isAuth);
// adminRoutes.use(isAdmin);

adminRoutes.get('/admin', adminController.getAdminPanel);
adminRoutes.get('/admin/active-tasks', adminController.getActiveTasks);
adminRoutes.get('/admin/hold-tasks', adminController.getHoldTasks);
adminRoutes.get('/admin/review-tasks', adminController.getReviewingTasks);
adminRoutes.get('/admin/completed-tasks', adminController.getCompletedTasks);
adminRoutes.get('/admin/admin-edit/:id', adminController.getAdminEditTask);
adminRoutes.get('/admin/admin-edit', adminController.postAdminEditTask);

module.exports = adminRoutes;
