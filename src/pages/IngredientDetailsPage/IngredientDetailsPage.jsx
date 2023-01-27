import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CLOSE_INGREDIENT_DETAILS } from '../../services/actions/menu';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import Modal from '../../components/Modal/Modal';

export default function IngredientDetailsPage() {
  const { id } = useParams();
  const ingredients = useSelector(store => store.menu.items);
  const ingredient = ingredients.find(item => item._id === id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onClose() {
    dispatch({type: CLOSE_INGREDIENT_DETAILS});
    navigate(-1);
  }
  
  return (
    <div>
      {ingredient && (
        <Modal title='Детали ингредиента' onClose={onClose}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </div>
  )
}
