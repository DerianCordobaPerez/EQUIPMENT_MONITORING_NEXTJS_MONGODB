import { useState, useEffect } from 'react'
import Field from './field'
import FieldGroup from './fieldGroup'
import Select from './select'
import Link from 'next/link'
import Option from './option'

const fieldMeetsCondition = (values) => (field) => {
  if (field.conditional && field.conditional.field) {
    const segments = field.conditional.field.split('_')
    const fieldId = segments[segments.length - 1]
    return values[fieldId] === field.conditional.value
  }
  return true
}

export default function Form({ data, closeRoute, handleSubmit }) {
  const [page, setPage] = useState(0)
  const [currentPageData, setCurrentPageData] = useState(data[page])
  const [values, setValues] = useState({})

  closeRoute ??= '/'

  useEffect(() => {
    const upcomingPageData = data[page]
    setCurrentPageData(upcomingPageData)
    setValues((currentValues) => {
      const newValues = upcomingPageData.fields.reduce((obj, field) => {
        if (field.component === 'field_group') {
          for (const subField of field.fields) {
            obj[subField.uid] = ''
          }
        } else {
          obj[field.uid] = ''
        }

        return obj
      }, {})

      return Object.assign({}, newValues, currentValues)
    })
  }, [page, data])

  const fieldChange = (fieldId, value) => {
    setValues((currentValues) => {
      currentValues[fieldId] = value
      return currentValues
    })

    setCurrentPageData((currentPageData) => {
      return Object.assign({}, currentPageData)
    })
  }

  const navigatePages = (direction) => () => {
    const findNextPage = (page) => {
      const upcomingPageData = data[page]
      if (upcomingPageData.conditional && upcomingPageData.conditional.field) {
        const segments = upcomingPageData.conditional.field.split('_')
        const fieldId = segments[segments.length - 1]

        const fieldToMatchValue = values[fieldId]

        if (fieldToMatchValue !== upcomingPageData.conditional.value) {
          return findNextPage(direction === 'next' ? page + 1 : page - 1)
        }
      }
      return page
    }

    setPage(findNextPage(direction === 'next' ? page + 1 : page - 1))
  }

  const nextPage = navigatePages('next')
  const prevPage = navigatePages('prev')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    handleSubmit(values)
  }

  return (
    <form
      className="mx-auto bg-light rounded shadow p-4 form"
      onSubmit={onSubmit}
    >
      <Link href={closeRoute}>
        <a className="form__close">
          <i className="bi bi-x-circle-fill"></i>
        </a>
      </Link>
      <h2 className="title__form">{currentPageData.label}</h2>
      {currentPageData.fields
        .filter(fieldMeetsCondition(values))
        .map((field) => {
          switch (field.component) {
            case 'field_group':
              return (
                <FieldGroup
                  key={field.uid}
                  field={field}
                  change={fieldChange}
                  values={values}
                />
              )
            case 'select':
              return (
                <Select
                  key={field.uid}
                  field={field}
                  change={fieldChange}
                  value={values[field.uid]}
                />
              )
            case 'options':
              return (
                <Option
                  key={field.uid}
                  field={field}
                  fieldChanged={fieldChange}
                  value={values[field.uid]}
                />
              )
            default:
              return (
                <Field
                  key={field.uid}
                  field={field}
                  change={fieldChange}
                  value={values[field.uid]}
                />
              )
          }
        })}

      {page > 0 && (
        <button className="btn btn-secondary btn-sm mt-2" onClick={prevPage}>
          <i className="bi bi-arrow-left"></i>
          Back
        </button>
      )}

      {page < data.length - 1 && (
        <button className="btn btn-success btn-sm mt-2" onClick={nextPage}>
          Next
          <i className="bi bi-arrow-right"></i>
        </button>
      )}

      {page === data.length - 1 && (
        <div className="d-grid gap-2">
          <hr />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      )}
    </form>
  )
}
