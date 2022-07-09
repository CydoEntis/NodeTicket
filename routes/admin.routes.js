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
adminRoutes.get('/submitted-tickets', isAdmin, adminController.getPendingTickets);
adminRoutes.get('/assigned-tickets', isAdmin, adminController.getAssignedTickets);
adminRoutes.get('/completed-tickets', isAdmin, adminController.getCompletedTickets);

module.exports = adminRoutes;
