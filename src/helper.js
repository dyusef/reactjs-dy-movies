import React, { Component } from "react";
import Pagination from "react-js-pagination";
import connect from "react-redux/es/connect/connect";
import moment from "moment";
import Swal from "sweetalert2";
import dollarY from "assets/status/dollar_y.svg";
import dollar from "assets/status/dollar.svg";
import ProfileImage from "assets/profile.png";
import dollarWhite from "assets/status/dollar_white.svg";
import pack_deliveryY from "assets/status/pack_delivery_y.svg";
import pack_deliveryWhite from "assets/status/pack_delivery_y_white.svg";
import pack_delivery from "assets/status/pack_delivery_y_non.svg";
import pack_deliveredY from "assets/status/pack_delivered_y.svg";
import pack_deliveredWhite from "assets/status/pack_delivered_y_white.svg";
import pack_delivered from "assets/status/pack_delivered_y_non.svg";
import truckY from "assets/status/truck_y.svg";
import truckWhite from "assets/status/truck_y_white.svg";
import truck from "assets/status/truck_y_non.svg";
import confirmY from "assets/status/confirmation.svg";
import confirmWhite from "assets/status/confirmation_white.svg";
import confirm from "assets/status/confirmation_non.svg";
import { IoPlay, IoPlayForward, IoPlayBack } from "react-icons/io5";
import { Button } from "rsuite";

export const statusOrder = (type, status, iswhite = false) => {
  if (type === "dollar") {
    return !iswhite ? (status ? dollarY : dollar) : dollarWhite;
  } else if (type === "packing") {
    return !iswhite ? (status ? pack_deliveryY : pack_delivery) : pack_deliveryWhite;
  } else if (type === "delivered") {
    return !iswhite ? (status ? pack_deliveredY : pack_delivered) : pack_deliveredWhite;
  } else if (type === "truck") {
    return !iswhite ? (status ? truckY : truck) : truckWhite;
  } else if (type === "confirm") {
    return !iswhite ? (status ? confirmY : confirm) : confirmWhite;
  }
};

export const stringifyFormData = (fd) => {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return data;
};

export const addFooters = (doc) => {
  var width = doc.internal.pageSize.getWidth();
  var height = doc.internal.pageSize.getHeight();
  doc.page = 1;
  // const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(7);
  doc.text(width - 40, height - 30, "Page - " + doc.page);
  doc.page++;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  return doc;
};
var date = new Date();
date.setDate(date.getDate());
export const rangeDate = {
  "Hari Ini": [date.setDate(date.getDate() + 1), moment()],
  Kemarin: [date.setDate(date.getDate() - 1), date.setDate(date.getDate() - 1)],
  "7 Hari Terakhir": [moment().subtract(6, "days"), moment()],
  "30 Hari Terakhir": [moment().subtract(29, "days"), moment()],
  "Minggu Ini": [moment().startOf("isoWeek"), moment().endOf("isoWeek")],
  "Minggu Lalu": [moment().subtract(1, "weeks").startOf("isoWeek"), moment().subtract(1, "weeks").endOf("isoWeek")],
  "Bulan Ini": [moment().startOf("month"), moment().endOf("month")],
  "Bulan Lalu": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")],
  "Tahun Ini": [moment().startOf("year"), moment().endOf("year")],
  "Tahun Lalu": [moment().subtract(1, "year").startOf("year"), moment().subtract(1, "year").endOf("year")],
};

export const toMoney = (angka) => {
  return angka.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
};
// export const toCurrency = (angka) => {
//     return isEmpty(angka)?'':angka.toString().replace(/,|\D/g,'').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
export const toCurrency = (angka) => {
  let numbers = 0;
  if (parseFloat(angka) < 0) {
    numbers = angka.toString().replace("-", "");
  } else {
    numbers = angka;
  }
  var number_string = numbers === "" || numbers === undefined ? String(0.0) : numbers.toString().replace(/,|\D/g, ""),
    split = number_string.split("."),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan koma jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    var separator = sisa ? "," : "";
    rupiah += separator + ribuan.join(",");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  rupiah = parseFloat(angka) < 0 ? "-" + rupiah.replace(/^0+/, "") : rupiah.replace(/^0+/, "");
  return rupiah;
};
export const rmComma = (angka) => {
  let numbers = 0;
  if (parseFloat(angka) < 0) {
    numbers = angka.toString().replace("-", "");
  } else {
    numbers = angka;
  }
  var number_string = numbers === "" || numbers === undefined ? String(0.0) : numbers.toString().replace(/,|\D/g, ""),
    split = number_string.split("."),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    rupiah += ribuan.join("");
  }

  rupiah = split[1] !== undefined ? rupiah + "" + split[1] : rupiah;
  rupiah = parseFloat(angka) < 0 ? "-" + rupiah.replace(/^0+/, "") : rupiah.replace(/^0+/, "");
  return parseInt(rupiah, 10);
};
// export const rmComma = (angka) => {
//
//     return parseInt(isEmpty(angka)?0:angka.toString().replace(/,/g,''),10);
// }
export const toPersen = (val1, val2) => {
  let con = (parseFloat(val1) / parseInt(val2, 10)) * 100;
  return con.toFixed(2);
};
export const toNominal = (val1, val2) => {
  let con = parseFloat(val1) * (parseFloat(val2) / 100);
  return con.toFixed(2);
};

export const toRp = (angka) => {
  // return Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(txt);
  // var number_string = angka.toString().replace(/[^,\d]/g, ''),
  let numbers = 0;
  if (parseFloat(angka) < 0) {
    numbers = angka.toString().replace("-", "");
  } else {
    numbers = angka;
  }
  var number_string = numbers === "" || numbers === undefined || numbers === null ? String(0.0) : numbers.toString(),
    split = number_string.split("."),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if (ribuan) {
    var separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  rupiah = parseFloat(angka) < 0 ? "-" + rupiah : rupiah;
  return rupiah;
};
export const ToastQ = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
export const statusQ = (lbl, txt) => {
  if (lbl === "success") {
    return (
      // <button className="btn btn-success btn-sm btn-status" style={{ fontSize: "8px" }}>
      //   {txt}
      // </button>
      <Button size="xs" color={"green"}>
        {txt}
      </Button>
    );
  } else if (lbl === "danger") {
    return (
      <Button size="xs" color={"red"}>
        {txt}
      </Button>
    );
  } else if (lbl === "warning") {
    return (
      <Button size="xs" color={"orange"}>
        {txt}
      </Button>
    );
  } else if (lbl === "info") {
    return (
      <Button size="xs" color={"cyan"}>
        {txt}
      </Button>
    );
  }
};

export const getMargin = (hrg_jual, hrg_beli) => {
  return (((parseInt(hrg_jual, 10) - parseInt(hrg_beli, 10)) / parseInt(hrg_beli, 10)) * 100).toFixed(2);
};

export const CapitalizeEachWord = (str) => {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};
export const generateNo = (i, current_page, perpage = 10) => {
  return i + 1 + perpage * (parseInt(current_page, 10) - 1);
};
export const noImage = () => {
  return ProfileImage;
};

export const isEmptyOrUndefined = (val) => {
  if (val === "" || val === undefined || val === null || val === "null" || val === "undefined") {
    return false;
  }
  return true;
};
export const handleError = (val, msg = "tidak boleh kosong") => {
  return ToastQ.fire({ icon: "error", title: `${val} ${msg}` });
};

export const swallOption = (msg, callback, isCancel) => {
  Swal.fire({
    title: "Informasi !!!",
    html: `${msg}`,
    icon: "warning",
    allowOutsideClick: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: `Oke`,
    cancelButtonText: "Batal",
    showCancelButton: true,
    cancelButtonColor: "#d33",
  }).then(async (result) => {
    if (result.value) {
      callback();
    } else {
      if (isCancel) {
        isCancel();
      }
    }
  });
};

export const swalWithCallback = (msg, callback) => {
  Swal.fire({
    title: "Informasi !!!",
    html: `${msg}`,
    icon: "warning",
    allowOutsideClick: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: `Oke`,
  }).then(async (result) => {
    if (result.value) {
      callback();
    }
  });
};
export const swal = (msg) => {
  Swal.fire({
    title: "Informasi !!!",
    html: `${msg}`,
    icon: "warning",
    allowOutsideClick: false,
    confirmButtonColor: "#3085d6",
    confirmButtonText: `Oke`,
  });
};

export const downloadTxtFile = (data, fileName = "shipping_label") => {
  const element = document.createElement("a");
  const file = new Blob([data], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `${fileName}.txt`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

export const validateSvg = (ext) => {
  if (ext !== "image/svg+xml") {
    return "gambar harus svg";
  } else {
    return "";
  }
  // return ext !== "image/svg+xml" ? false : true;
};

class Paginationq extends Component {
  // constructor(props){
  //     super(props);
  // }

  render() {
    return (
      <Pagination
        activePage={parseInt(this.props.current_page, 10)}
        itemsCountPerPage={parseInt(this.props.per_page, 10)}
        totalItemsCount={parseInt(this.props.total, 10)}
        pageRangeDisplayed={3}
        onChange={this.props.callback}
        itemClass="page-item"
        linkClass="page-link"
        activeClass="page-item active"
        disabledClass="page-item disabled"
        prevPageText={<IoPlay style={{ transform: "rotate(180deg)" }} />}
        nextPageText={<IoPlay />}
        firstPageText={<IoPlayBack />}
        lastPageText={<IoPlayForward />}
      />
    );
  }
}

export default connect()(Paginationq);
