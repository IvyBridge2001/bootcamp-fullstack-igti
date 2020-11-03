import Transactions from './models.js'
import date from './date.js'

class Transaction {
  async index(req, res) {
    const { yearMonth } = req.params

    try {
      const transactions = await Transactions
        .find({ yearMonth })
        .sort({ yearMonthDay: -1 })

      const incomes = await Transactions.aggregate([
        { $match: { type: '+', yearMonth } },
        { $group: { _id: null, value: { $sum: '$value' } } },
        { $project: { _id: 0, value: 1 } }
      ])

      const expenses = await Transactions.aggregate([
        { $match: { type: '-', yearMonth } },
        { $group: { _id: null, value: { $sum: '$value' } } },
        { $project: { _id: 0, value: 1 } }
      ])

      const launches = await Transactions
        .find({ yearMonth })
        .countDocuments()

      const data = {
        incomes: incomes[0].value,
        expenses: expenses[0].value,
        launches,
        balance: incomes[0].value - expenses[0].value
      }

      const distinctDays = await Transactions
        .find({ yearMonth })
        .distinct('day')

      transactions.reverse()
      distinctDays.sort((a, b) => b - a)

      res.status(200).json({ transactions, data, distinctDays })
    } catch (error) {
      res.status(500).json({
        error: error.message,
        msg: 'Erro ao encontrar trasações'
      })
    }
  }

  async create(req, res) {
    const { 
      description, value, category, yearMonthDay, type
    } = req.body

    const { 
      year, month, day, yearMonth 
    } = date(yearMonthDay)

    try {
      const trasaction = await Transactions.create({
        description, value: Number(value), category,
        year, month, day, yearMonth, yearMonthDay,
        type
      })

      res.status(200).json(trasaction)
    } catch (error) {
      res.status(500).json({
        error: error.message,
        msg: 'Erro ao criar nova transação'
      })
    }
  }

  async delete(req, res) {
    const { id } = req.params

    try {
      const trasaction = await Transactions.findByIdAndRemove(id)

      res.status(200).json(trasaction)
    } catch (error) {
      res.status(500).json({
        error: error.message,
        msg: 'Erro ao excluir transação'
      })     
    }
  }

  async update(req, res) {
    const { 
      _id, description, value, category, yearMonthDay, type
    } = req.body

    const { 
      year, month, day, yearMonth 
    } = date(yearMonthDay)

    try {
      await Transactions.updateOne({ _id }, {
        description, value, category,
        year, month, day, yearMonth, yearMonthDay,
        type
      })

      res.status(200).json({msg: 'Alteração realizada com sucesso!'})
    } catch (error) {
      res.status(500).json({
        error: error.message,
        msg: 'Erro ao alterar transação'
      })
    }
  }

  async distinctYearsMonths(req, res) {
    try {
      const distinctYearsMonths = await Transactions
        .distinct('yearMonth')

      distinctYearsMonths.sort().reverse()

      res.status(200).json(distinctYearsMonths)
    } catch (error) {
      res.status(500).json({
        error: error.message,
        msg: 'Erro ao encontrar yearMonthos'
      })
    }
  }
}

export default Transaction
