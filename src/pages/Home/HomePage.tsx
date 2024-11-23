import ButtonGroup_Main from '../../components/Button/ButtonGroup_Main';
import HeaderTitle from '../../components/Misc/headerTitle';

const HomePage = () => {
  return (
    <div className='homeContainer'>
      <div className='contentWrapper'>
        <HeaderTitle title='Выберите раздел для дальнейшей работы' />
        <ButtonGroup_Main />
      </div>
    </div>
  );
};

export default HomePage;
