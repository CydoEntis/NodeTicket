const express = require('express');

const adminController = require('../controllers/admin/admin.controller');

const adminRoutes = express.Router();

function isAdmin(req, res, next) {
  if (req.user.role === 'admin') {
      next();
		} else {
      console.log('Access Denied');
      res.redirect('/dashboard');
    }
}

adminRoutes.get('/admin', isAdmin, adminController.getAdminPanel);
adminRoutes.get('/admin/active-tasks', isAdmin, adminController.getActiveTasks);
adminRoutes.get('/admin/hold-tasks', isAdmin, adminController.getHoldTasks);
adminRoutes.get('/admin/review-tasks', isAdmin, adminController.getReviewingTasks);
adminRoutes.get('/admin/completed-tasks', isAdmin, adminController.getCompletedTasks);

module.exports = adminRoutes;
