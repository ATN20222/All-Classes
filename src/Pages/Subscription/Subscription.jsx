import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCirclePlus, faEllipsisV, faSearch } from "@fortawesome/free-solid-svg-icons";
import CashIcon from '../../Assets/Images/CashHistoryImahe.svg';
import './Subscription.css';
import AddPlanModal from "./AddPlanModal";
import { SubscriptionService } from "../../Services/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteModalComponent from "../../Components/DeleteModalComponent/DeleteModalComponent";
import EditPlanModal from "./EditPlanModal";

const Subscription = () => {
  const [activeMenuId, setActiveMenuId] = useState(null); // Track which plan's menu is open
  const [isOverlayOpen , setIsOverlayOpen] = useState(false);
  const [planToDelete,setPlanToDelete] = useState('');
  const [plans , setPlans] = useState([]);
  const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
  const [editModalOpen,setEditModalOpen] = useState(false);
  const [selectedPlan , setSelectedPlan] = useState({});
    useEffect(()=>{
      getData();
  },[])
  

  async function getData() {
      try {
          const response = await SubscriptionService.List();
          setPlans(response.content);
      } catch (error) {
          console.error(error);
      }
  }
  const handleDelete = async (id)=>{
      try {
              
          const response = await SubscriptionService.Delete(id);
          toast.success('Brand deleted successfully');
          getData();
      } catch (error) {
          toast.error('Failed to delete brand');
          
      }finally{
          setPlanToDelete('')
      }
  }

    const handleAddPlan = async (planName, price, planDetails, frequency)=>{
      try {    
        const response = await SubscriptionService.Add(planName,frequency, price,planDetails);
        toast.success('Plan added successfully');
        getData();

    } catch (error) {
        console.log(error)
        toast.error('Failed to add plan'); 
    }
    }
    const handleEditPlan = async (id,planName, price, planDetails, frequency)=>{
      try {    
        const response = await SubscriptionService.Edit(id,planName,frequency, price,planDetails);
        toast.success('Plan updated successfully');
        getData();

    } catch (error) {
        console.log(error)
        toast.error('Failed to update plan'); 
    }
    }
  const data = [
    {
      id: 1,
      name: 'Ahmed ali',
      brand_name: 'Papa johns',
      cash_id: '936737',
      date: 'Aug 19, 2023',
      price_before: '200',
      price_after: '188',
      time: '10:00 am'
    },
    {
      id: 2,
      name: 'Ahmed ali',
      brand_name: 'Papa johns',
      cash_id: '936737',
      date: 'Aug 19, 2023',
      price_before: '200',
      price_after: '188',
      time: '10:00 am'
    },
    {
        id: 2,
        name: 'Ahmed ali',
        brand_name: 'Papa johns',
        cash_id: '936737',
        date: 'Aug 19, 2023',
        price_before: '200',
        price_after: '188',
        time: '10:00 am'
      },
      {
        id: 2,
        name: 'Ahmed ali',
        brand_name: 'Papa johns',
        cash_id: '936737',
        date: 'Aug 19, 2023',
        price_before: '200',
        price_after: '188',
        time: '10:00 am'
      },
      {
        id: 2,
        name: 'Ahmed ali',
        brand_name: 'Papa johns',
        cash_id: '936737',
        date: 'Aug 19, 2023',
        price_before: '200',
        price_after: '188',
        time: '10:00 am'
      },
    // More items...
  ];
  const plansdata = [
    {
      id: 1,
      plan_name: 'Business',
      price: '$29.99/mo',
      features: [
        'Voice messages anywhere',
        'Unlimited storage',
        'Priority support'
      ]
    },
    {
      id: 2,
      plan_name: 'Premium',
      price: '$49.99/mo',
      features: [
        'Voice messages anywhere',
        'Unlimited storage',
        'Dedicated support',
        'Free upgrades'
      ]
    },
    
    // More plans...
  ];

  const toggleMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  const handleEditClicked = (plan) => {
    // console.log(`Edit clicked for plan ${id}`);
    setSelectedPlan(plan);
    setEditModalOpen(true);
  };

  const handleDeleteClicked = (id) => {
    setPlanToDelete(id);
    setIsDeleteOverlayOpen(true);
  
  };

  return (
    <div className="MainContent Applications">
        <AddPlanModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddPlan={handleAddPlan}
            />
        <div className="Toaster">
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
        <EditPlanModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onEditPlan={handleEditPlan}
          plan={selectedPlan}
        />

        <DeleteModalComponent
                id={planToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
            />
      <div className="container">
        <div className="PageHeader">
          <div className="PageTitle PageTitleSecondary">Subscription</div>
          <div className="RightSideHeader">
            <div className="PageSearch">
              <input type="text" placeholder="Search" />
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>

        <div className="HistoryaCash">
          <span>Subscription History</span>
        </div>

        <div className="TableContainer CashierTableContainer SubscriptionTable container">
          <div className="row">
            {data.map((row) => (
              <div className="col-lg-12 TableRecord CashHistoryTableRecord" key={row.id}>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 d-flex align-items-center">
                      <div className="CashHistoryImage">
                        <img src={CashIcon} alt="" />
                      </div>
                      {row.name}
                    </div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-1 Center">{row.cash_id}</div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-1 Center text-success">
                      {row.price_before + ' EGP'}
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-3 col-3 Center">{row.date}</div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2 Center">{row.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="HistoryaCash PlansHeader">
          <span>Subscription Plans</span>
        </div>

        <div className="PlansContainer container">
          <div className="row Center">
            {plans.map((plan) => (
              <div className="col-lg-3 PlanCard" key={plan.id}>
                <div className="NewsSettings">
                  <div className="SettingsBtn PlanSettings" onClick={() => toggleMenu(plan.id)}>
                    <FontAwesomeIcon icon={faEllipsisV} className="text-white" />
                  </div>
                  {activeMenuId === plan.id && (
                    <div className="SettingsMenu">
                      <div className="MenuItem" onClick={() => handleEditClicked(plan)}>Edit</div>
                      <div className="MenuItem" onClick={() => handleDeleteClicked(plan.id)}>Delete</div>
                    </div>
                  )}
                </div>
                <div className="PlanName">
                  <span>{plan.plan_name}</span>
                </div>
                <div className="PlanPrice">
                  <span>{plan.amount+'EGP/'+plan.frequency+'day'}</span>
                </div>
                <ul className="list-unstyled">
                  {plan.details.split(",").map((feature, index) => (
                    <li key={index} className="list-item">
                      <div className="Icon">
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </div>
                      <div className="text">
                        <span>{feature}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))} 
            <div className="col-lg-3 PlanCard Center AddPlanCard">
                <FontAwesomeIcon icon={faCirclePlus} onClick={()=>setIsOverlayOpen(true)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
