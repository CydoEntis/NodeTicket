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
adminRoutes.get('/submitted-tasks', isAdmin, adminController.getPendingTasks);
adminRoutes.get('/assigned-tasks', isAdmin, adminController.getAssignedTasks);
adminRoutes.get('/completed-tasks', isAdmin, adminController.getCompletedTasks);

module.exports = adminRoutes;
