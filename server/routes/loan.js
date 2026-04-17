Const express = require(‘express’);
Const router = express.Router();
Const Loan = require(‘../models/Loan’);
Const auth = require(‘../middleware/auth’);


// Apply for loan
Router.post(‘/apply’, auth, async (req, res) => {
  Try {
    Let { amount, purpose, duration, interestRate } = req.body;

    Amount = Number(amount);
    Duration = Number(duration);
    interestRate = Number(interestRate) || 5;

    if (!amount || !purpose || !duration) {
      return res.status(400).json({ error: ‘Please provide all required fields’ });
    }

    If (amount <= 0 || duration <= 0) {
      Return res.status(400).json({ error: ‘Amount and duration must be valid numbers’ });
    }

    // Monthly interest rate
    Const rate = interestRate / 100 / 12;

    Const monthlyPayment =
      (amount * rate * Math.pow(1 + rate, duration)) /
      (Math.pow(1 + rate, duration) – 1);

    Const totalPayment = monthlyPayment * duration;

    Const loan = await Loan.create({
      userId: req.user._id,
      amount,
      purpose,
      duration,
      interestRate,
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      status: ‘pending’
    });

    Res.status(201).json({
      Success: true,
      Loan
    });

  } catch (error) {
    Console.error(error);
    Res.status(500).json({ error: ‘Server error’ });
  }
});


// Dashboard stats
Router.get(‘/dashboard/stats’, auth, async (req, res) => {
  Try {
    Const loans = await Loan.find({ userId: req.user._id });

    Const stats = {
      totalLoans: loans.length,
      pendingLoans: loans.filter(l => l.status === ‘pending’).length,
      approvedLoans: loans.filter(l => l.status === ‘approved’).length,
      activeLoans: loans.filter(l => l.status === ‘active’).length,
      rejectedLoans: loans.filter(l => l.status === ‘rejected’).length,
      completedLoans: loans.filter(l => l.status === ‘completed’).length,

      totalBorrowed: loans
        .filter(l => l.status === ‘approved’ || l.status === ‘active’)
        .reduce((sum, l) => sum + l.amount, 0),

      totalRepayment: loans
        .filter(l => l.status === ‘approved’ || l.status === ‘active’)
        .reduce((sum, l) => sum + Number(l.totalPayment), 0)
    };

    Res.json({
      Success: true,
      Stats
    });

  } catch (error) {
    Console.error(error);
    Res.status(500).json({ error: ‘Server error’ });
  }
});


// Get user’s loans
Router.get(‘/my-loans’, auth, async (req, res) => {
  Try {

    Const loans = await Loan.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    Res.json({
      Success: true,
      Loans
    });

  } catch (error) {
    Console.error(error);
    Res.status(500).json({ error: ‘Server error’ });
  }
});


// Get single loan
Router.get(‘/:id’, auth, async (req, res) => {
  Try {

    Const loan = await Loan.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    If (!loan) {
      Return res.status(404).json({ error: ‘Loan not found’ });
    }

    Res.json({
      Success: true,
      Loan
    });

  } catch (error) {
    Console.error(error);
    Res.status(500).json({ error: ‘Server error’ });
  }
});


Module.exports = router;
