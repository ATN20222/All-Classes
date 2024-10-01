import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCirclePlus, faEllipsisV, faSearch } from "@fortawesome/free-solid-svg-icons";
import CashIcon from '../../Assets/Images/CashHistoryImahe.svg';
import './Subscription.css';
import AddPlanModal from "./AddPlanModal";

const Subscription = () => {
  const [activeMenuId, setActiveMenuId] = useState(null); // Track which plan's menu is open
    const[isOverlayOpen , setIsOverlayOpen] = useState(false);
    const handleAddPlan = ()=>{
        
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
    setActiveMenuId(activeMenuId === id ? null : id); // Toggle the menu for the selected plan
  };

  const handleEditClicked = (id) => {
    console.log(`Edit clicked for plan ${id}`);
  };

  const handleDeleteClicked = (id) => {
    console.log(`Delete clicked for plan ${id}`);
  };

  return (
    <div className="MainContent Applications">
        <AddPlanModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddPlan={handleAddPlan}
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
            {plansdata.map((plan) => (
              <div className="col-lg-3 PlanCard" key={plan.id}>
                <div className="NewsSettings">
                  <div className="SettingsBtn" onClick={() => toggleMenu(plan.id)}>
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </div>
                  {activeMenuId === plan.id && (
                    <div className="SettingsMenu">
                      <div className="MenuItem" onClick={() => handleEditClicked(plan.id)}>Edit</div>
                      <div className="MenuItem" onClick={() => handleDeleteClicked(plan.id)}>Delete</div>
                    </div>
                  )}
                </div>
                <div className="PlanName">
                  <span>{plan.plan_name}</span>
                </div>
                <div className="PlanPrice">
                  <span>{plan.price}</span>
                </div>
                <ul className="list-unstyled">
                  {plan.features.map((feature, index) => (
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
