import React, { useState, useEffect } from 'react'

import Panel from '../../components/Panel'
import Launches from '../../components/Launches'
import Modal from '../../components/Modal'
import Category from '../../components/Category'

import API from '../../helpers/api.js'
import Format from '../../helpers/format.js'

function Main() {
  const api = new API()
  const format = new Format()

  const [ transactions, setTransactions ] = useState()
  const [ data, setData ] = useState()
  const [ distinctYearsMonths, setDistinctYearsMonths ] = useState()
  const [ distinctDays, setDistinctDays ] = useState()
  const [ yearMonth, setYearMonth ] = useState(format.yearMonth())
  const [ type, setType ] = useState()
  const [ category, setCategory ] = useState()
  const [ description, setDescription ] = useState()
  const [ value, setValue ] = useState()
  const [ date, setDate ] = useState()
  const [ filter, setFilter ] = useState()
  const [ filterDescription, setFilterDescription ] = useState()
  const [ id, setId ] = useState()
  const [ modify, setModify ] = useState()
  const [ edit, setEdit ] = useState(false)
  const [ modal, setModal ] = useState('close')

  useEffect(() => {
    (async () => {
      try {
        const { transactions, data, distinctDays } = await api.index(yearMonth)
      
        setTransactions(transactions)
        setData(data)
        setDistinctDays(distinctDays)
        setModify(false)
      } catch (error) {
        return
      }
    })()
  }, [yearMonth, modify])

  useEffect(() => {
    (async () => {
      try {
        setDistinctYearsMonths(await api.distinctYearsMonths())
      } catch (error) {
        return
      }
    })()
  }, [])

  useEffect(() => {
    try {
      const filter = transactions.filter(({ description }) => {
        const a = description.toLowerCase()
        const b = filterDescription.toLowerCase()
  
        return  a.includes(b)
      })

      const set = new Set()
      const today = format.day()

      filter.forEach(({ day }) => set.add(day))

      const distinctDays = Array.from(set).sort((a, b) => b - a)
      const days  = distinctDays.filter(day => day !== today)
      
      if(distinctDays.includes(today))
        days.unshift(today)

      setFilter(filter)
      setDistinctDays(
        yearMonth === format.yearMonth() ? days : distinctDays
      )
    } catch (error) {
      return 
    }
  }, [filterDescription])

  useEffect(() => {
    try {
      const transaction = transactions.find(({_id}) => _id === id)

      const { type, category, description, value, yearMonthDay } = transaction
      
      setType(type)
      setCategory(category)
      setDescription(description)
      setValue(value)
      setDate(yearMonthDay)
    } catch (error) {
      return 
    }
  }, [edit])

  async function create() {
    try {
      const transaction = {
        description,
        value,
        category,
        yearMonthDay: date,
        type
      }
  
      await api.create(transaction)
  
      setModify(true)
    } catch (error) {
      return
    }
  }

  async function del() {
    try {
      await api.delete(id)

      setModify(true)
    } catch (error) {
      return
    }
  }

  async function update() {
    try {
      const transaction = {
        _id: id,
        description,
        value,
        category,
        yearMonthDay: date,
        type
      }
  
      await api.update(transaction)
  
      setModify(true)
      setEdit(false)
    } catch (error) {
      return 
    }
  }

  return (
    <main className="container">
      <Panel 
        data={data} distinctYearsMonths={distinctYearsMonths} yearMonth={yearMonth} 
        handleChange={event => setYearMonth(event.target.value)}
      />
    
      <Launches 
        transactions={filter || transactions} distinctDays={distinctDays}
        handleCreate={() => {
          setType('-')
          setCategory('Outros')
          setDescription('')
          setValue('')
          setDate(format.yearMonthDay())
          setModal('open')
        }}
        handleEdit={event => {
          setId(event.target.id)
          setEdit(true)
          setModal('open')
        }}
        handleDelete={event => {
          setId(event.target.id)
          del()
        }}
        handleFilterDescription={event => setFilterDescription(event.target.value)}
      />

      <Modal 
        modal={modal} type={type} description={description} value={value} date={date}
        market={
          <Category 
            icon="shopping_cart" name="Mercado" category={category} 
            visible={type === '-' ? '' : 'close'}
            handleSelected={event => setCategory(event.target.value)}
          />
        }
        cheers={
          <Category 
            icon="local_hospital" name="Saúde" category={category}
            visible={type === '-' ? '' : 'close'}
            handleSelected={event => setCategory(event.target.value)}
          />
        }
        transport={
          <Category 
            icon="drive_eta" name="Transporte" category={category}
            visible={type === '-' ? '' : 'close'}
            handleSelected={event => setCategory(event.target.value)}
          />
        }
        home={
          <Category 
            icon="home" name="Moradia" category={category}
            visible={type === '-' ? '' : 'close'}
            handleSelected={event => setCategory(event.target.value)}
          />
        }
        trip={
          <Category 
            icon="local_airport" name="Viagem" category={category}
            visible={type === '-' ? '' : 'close'}
            handleSelected={event => setCategory(event.target.value)}
          />
        }
        recreation={
          <Category 
            icon="beach_access" name="Lazer" category={category}
            visible={type === '-' ? '' : 'close'}
            handleSelected={event => setCategory(event.target.value)}
          />
        }
        education={
          <Category 
            icon="school" name="Educação" category={category}
            visible={type === '-' ? '' : 'close'}
            handleSelected={event => setCategory(event.target.value)}
          />
        }
        salary={
          <Category 
            icon="local_atm" name="Salário" category={category}
            visible={type === '+' ? '' : 'close'}
            handleSelected={event => setCategory(event.target.value)}
          />
        }
        investiments={
          <Category 
            icon="trending_up" name="Investimentos" category={category}
            visible={type === '+' ? '' : 'close'}
            handleSelected={event => setCategory(event.target.value)}
          />
        }
        gift={
          <Category 
            icon="redeem" name="Presente" category={category}
            visible={type === '+' ? '' : 'close'}
            handleSelected={event => setCategory(event.target.value)}
          />
        }
        others={
          <Category 
            icon="linear_scale" name="Outros" category={category}
            handleSelected={event => setCategory(event.target.value)}
          />
        }
        handleClose={() => {
          setEdit(false)
          setModal('close')
        }}
        handleType={event => {
          setType(event.target.value)
          setCategory('Outros')
        }}
        handleDescription={event => setDescription(event.target.value)}
        handleValue={event => setValue(event.target.value)}
        handleDate={event => setDate(event.target.value)}
        handleSave={event => {
          event.preventDefault()
          edit ? update() : create()
          setModal('close')
        }}
      />
    </main>
  )
}

export default Main
