import ContainerAdmin from "../commoncomponents/Container/ContainerAdmin";
import UserListingModel from "../components/expensecomponents/userListingModel";

const usersList = () => {
  return (
    <ContainerAdmin >
      <UserListingModel/>
    </ContainerAdmin>
  );
};

export default usersList;
