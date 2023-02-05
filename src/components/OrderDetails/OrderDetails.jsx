import orderDetailsStyles from './OrderDetails.module.css';
import acceptedImage from "../../images/acceptedImage.svg";
import { useSelector } from 'react-redux';

export default function OrderDetails() {
  const orderRequest = useSelector(store => store.order.orderRequest);

  return (
    <>
      {
        orderRequest ? (
          <h3 className="text text_type_main-large mt-15 mb-10">
            Ваш заказ обрабатывается...
          </h3>
        ) : (
          <div className={`${orderDetailsStyles.container} mt-8`} >
            <p className="mb-15 text text_type_main-medium">Идентификатор заказа</p>
            <img
              src={acceptedImage}
              alt='Готово'
              className={`${orderDetailsStyles.image} mb-15`}
            />
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
          </div >
        )
      }
    </>
  )
}
