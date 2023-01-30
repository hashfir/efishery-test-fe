import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import JsonToForm from 'json-reactform';
import { LoaderComponent, Table } from '../../component';
import { getDataFirst, submitData, deleteData } from '../../services/Api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import moment from 'moment';
import Swal from 'sweetalert2';
import {
  useLoaderData,
} from "react-router-dom";


const customStyles = {
  overlay: {
    backgroundColor: "rgba(206, 206, 206, 0.514)",
  },
  content: {
    width: "50%",
    margin: "auto",
    height: "430px",
    zIndex: 1300,
    borderRadius: 10,
    // justifyContent:"center",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
};
const closeModalStyle = {
  position: "absolute",
  top: 2,
  right: 13,
  color: "red",
  fontSize: 20,
  cursor: "pointer",
  zIndex: 1
};
function Dashboard() {
  const tableColumn = [
    { column: 'Commodity', field: 'komoditas' },
    { column: 'City', field: 'area_kota' },
    { column: 'Province', field: 'area_provinsi' },
    { column: 'Price', field: 'price' },
    { column: 'Size', field: 'size' },
    { column: 'Time', field: 'tgl_parsed', type: "date", format: "MMM D YYYY" },
    // { column: 'Packaging', field: 'timestamp' },
    { column: 'Actions', field: 'uuid', type: "action", },
  ];
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(20);
  const [search, setSearch] = useState('');

  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [defaultValue, setDefaultValue] = useState({
    uuid: null,
    Commodity: '',
    City: '',
    Price: '',
    Size: '',
    Time: '',
    timestamp: '',
  });

  const openModal = () => {
    setModal(true)
    setModalType('add')
  };
  const closeModal = () => {
    setModal(false)
    setDefaultValue(
      {
        uuid: null,
        Commodity: '',
        City: '',
        Price: '',
        Size: '',
        Time: '',
        timestamp: '',
      }
    )
    setModalType('add')
  };
  const openModalEdit = (param) => {
    const dt = {
      uuid: param.uuid,
      Commodity: param.komoditas,
      City: `${param.area_provinsi}-${param.area_kota}`,
      Price: param.price,
      Size: param.size,
      Time: param.tgl_parsed === null ? null : new Date(param.tgl_parsed),
      timestamp: param.timestamp,
    }
    setDefaultValue(dt)
    setModal(true)
    setModalType('edit')
  };
  const openModalDelete = (elem) => {
    const pyld = { "condition": { "uuid": elem } }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deletemutation.mutate(pyld);
      }
    })
  }

  const fetchData = async () => {
    const datas = await getDataFirst(limit, offset, search);
    return datas;
  };

  const {
    // isLoading,
    data,
    isFetching,
    refetch
  } = useQuery(['users', offset, limit], () => fetchData(limit, offset, search), { keepPreviousData: true });

  const listDataArea = useLoaderData();

  const updateVisibility = () => {
    refetch();
  };

  const mutation = useMutation(submitData, {
    onError: async () => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error submit the data',
      })
    },
    onSuccess: async () => {
      closeModal()
      updateVisibility()
      Swal.fire(
        'Submited!',
        'Your data has been changes.',
        'success'
      )
    },
  });

  const deletemutation = useMutation(deleteData, {
    onError: async (error, _variables, context) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error delete the data',
      })
    },
    onSuccess: async () => {
      closeModal()
      updateVisibility()
      Swal.fire(
        'Submited!',
        'Your data has been changes.',
        'success'
      )
    },
  });

  const dataForm = {
    'Time': {
      type: 'date',
      // format: 'dd MMMM yyyy',
      required: true,
      defaultValue: defaultValue.Time
    },
    'Commodity': {
      type: 'text',
      required: true,
      defaultValue: defaultValue.Commodity
    },
    'City': {
      type: 'select',
      required: true,
      options: listDataArea.area,
      defaultValue: defaultValue.City
    },
    'Size': {
      type: 'select',
      required: true,
      options: listDataArea.size,
      defaultValue: defaultValue.Size
    },
    'Price': {
      type: 'number',
      required: true,
      defaultValue: defaultValue.Price
    },


    Save: { // button submit
      type: 'submit',
    }
  };

  const submit = (params) => {
    const date = moment(params.Time);
    const timestamp = date.valueOf();
    function uuidv4() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        // eslint-disable-next-line no-mixed-operators
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    }
    let splitArray = params?.City?.value.split("-");
    const py = {
      "uuid": modalType === 'add' ? uuidv4() : defaultValue.uuid,
      "komoditas": params.Commodity,
      "area_provinsi": splitArray[0],
      "area_kota": splitArray[1],
      "size": params.Size.value,
      "price": params.Price,
      "tgl_parsed": "2022-01-18T13:45:46Z",
      "timestamp": modalType === 'add' ? timestamp : defaultValue.timestamp
    }
    const payloadEdit = {
      "condition": {
        "uuid": defaultValue.uuid
      },
      "set": py
    }

    const payload = {
      type: modalType,
      payload: modalType === 'add' ? [py] : payloadEdit,
    };
    mutation.mutate(payload);
  };

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      searchData(event)
    }
  }

  const searchData = (e) => {
    let param = e.target.value
    const dt = `{"komoditas":"${param.toUpperCase()}"}`
    // const dt = e.target.value

    setSearch(dt)
    setTimeout(() => {
      updateVisibility()
    }, 500);
  }

  return (
    <div style={{ marginTop: 30 }}>
      {isFetching || deletemutation.isLoading ? <LoaderComponent /> : <> </>}
      <div className='headertable'>
        <h3>List Of Data</h3>
        <button className='button-3' disabled={offset === 0} type="button" onClick={() => { openModal() }}>
          Add Data
        </button>
      </div>
      <input className='search' type="search" placeholder='search...' onKeyPress={handleKeyPress} onBlur={(e) => searchData(e)} />

      <Table
        data={data}
        column={tableColumn}
        limit={limit}
        setLimit={setLimit}
        offset={offset}
        setOffset={setOffset}
        updateVisibility={updateVisibility}
        handleEdit={openModalEdit}
        handleDelete={openModalDelete}
      />

      <Modal
        isOpen={modal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className='modals'>
          <div
            onClick={closeModal}
            style={closeModalStyle}>
            X
          </div>
          {mutation.isLoading ? <LoaderComponent /> :
            <JsonToForm model={dataForm} onSubmit={submit} />
          }
        </div>

      </Modal>
    </div>
  );
}

export default Dashboard;
