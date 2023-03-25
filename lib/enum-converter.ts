export function property(data){
    let outPut;
    switch(data) {
      case "c":
        outPut = "اداری / تجاری"
        break;
      case "a":
        outPut = "آپارتمان"
        break;
      case "v":
        outPut = "ویلایی / باغ و باغچه"
        break;
      case "l":
        outPut = "زمین / کلنگی"
        break;
      default:
        outPut = "مستقلات / پنت هاوس"
    }
    return outPut;
  }

  export function room(data){
    let outPut;
    switch(data) {
      case "one":
        outPut = "۱"
        break;
      case "two":
        outPut = "۲"
        break;
      case "three":
        outPut = "۳"
        break;
      case "four":
        outPut = "۴"
        break;
      default:
        outPut = "۵"
    }
    return outPut;
  }

  export function meterage(data){
    let outPut;
    switch(data) {
      case "m10":
        outPut = "۱۰ تا ۹۰ متر"
        break;
      case "m90":
        outPut = "۹۰ تا ۱۵۰ متر"
        break;
      case "m150":
        outPut = "۱۵۰ تا ۲۲۰ متر"
        break;
      default:
        outPut = "۲۲۰ متر به بالا"
    }
    return outPut;
  }
  export function assignment(data){
    let outPut;
    switch(data) {
      case "rental":
        outPut = "رهن و اجاره"
        break;
      case "forSale":
        outPut = "خرید"
        break;
      default:
        outPut = "فروش فوری"
    }
    return outPut;
  }
  export function advertisingStatus(data){
      let outPut;
      switch(data) {
        case "awaitingPayment":
          outPut = "در انتظار پرداخت"
          break;
        case "awaitingConfirmation":
          outPut = "در انتظار تایید"
          break;
        case "active":
          outPut = "منتشر شده"
          break;
        case "expired":
          outPut = "منقضی شده"
          break;
        default:
          outPut = "حذف شده"
      }
      return outPut;
  }


  export function roleFun(data){
    let outPut;
    switch(data) {
      case "admin":
        outPut = "ادمین"
        break;
      case "agencyOwner":
        outPut = "مدیر املاک"
        break;
      case "agencyAgent":
        outPut = "کارشناس"
        break;
      default:
        outPut = "کاربری عادی"
    }
    return outPut;
  }
  export function requestStatus(data){
    let outPut;
    switch(data) {
      case "accepted":
        outPut = "تاییده شده"
        break;
      case "denied":
        outPut = "رد شده"
        break;
      default:
        outPut = "در حال بررسی"
    }
    return outPut;
  }
