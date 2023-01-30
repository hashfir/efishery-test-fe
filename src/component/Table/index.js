import React from 'react';
import moment from 'moment';
import '../component.css';
import '../../index.css';
import './table.css';

function Table({
  theme = 'mode1',
  width = '100%',
  column = [],
  data = [],
  selectionParam,
  selectAction,
  limit,
  setLimit,
  offset,
  setOffset,
  updateVisibility,
  handleEdit,
  handleDelete
}) {
  const nextPage = () => {
    setOffset(offset + limit);
    updateVisibility();
  };
  const prevPage = () => {
    if (offset !== 0) {
      setOffset(offset - limit);
      updateVisibility();
    }
  };
  return (
    <div>
      <table style={{ width }} className={`table-${theme}`}>
        <thead>
          <tr className={`th-${theme}`}>
            {
              column.map((el, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <td key={i} className={`td-head-${theme}`}>
                  {el.column}
                </td>
              )
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((el, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={i} className={`tr-body-${theme}`} onClick={() => { selectionParam === 'all' ? selectAction(el) : selectAction(el.product_id); }}>
                {column.map((element, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <td key={index} className={`td-body-${theme}`}>
                    {element.type === 'more'
                      ? (
                        <div className="row-space-between">
                          <span>{el[element.field]}</span>
                          <span style={{ color: '#0d6efd' }}>
                            {'>'}
                          </span>
                        </div>
                      )
                      : element.type === 'date'
                        ? (
                          <span>
                            {el[element.field]!== null ? moment(el[element.field]).format(element.format):"NULL"}
                          </span>
                        )
                        : element.type === 'action'
                        ? (
                          <span>
                            <button className='button-13'  onClick={()=>handleEdit(el)}>
                              Edit
                              </button> 
                              <button className='button-45'  onClick={()=>handleDelete(el[element.field])}>
                              Delete
                              </button> 
                              </span>
                        )
                        : (
                          <span>
                            {el[element.field] === null ? 'NULL' : el[element.field]}
                          </span>
                        )}
                  </td>

                ))}

              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="pagination">
        <button className='button-3' disabled={offset === 0} type="button" onClick={prevPage}>
          prev
        </button>
        <span>
          Page
          {' '}
          {offset === 0 ? 1 : offset / limit + 1}
        </span>
        <button className='button-3' disabled={data.length < limit} type="button" onClick={nextPage}>
          next
        </button>
      </div>
    </div>

  );
}

export default Table;
