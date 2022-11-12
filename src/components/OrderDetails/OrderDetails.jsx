import orderDetailsStyles from './OrderDetails.module.css';
import acceptedImage from "../../images/acceptedImage.svg";

export default function OrderDetails() {
  return (
    <div className={`${orderDetailsStyles.container} mt-8`}>
      <p className="mb-15 text text_type_main-medium">Идентификатор заказа</p>
      <img
        src={acceptedImage}
        alt='Готово'
        className={`${orderDetailsStyles.image} mb-15`}
      />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}
