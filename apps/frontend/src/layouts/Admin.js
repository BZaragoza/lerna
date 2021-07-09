import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";

import Orders from "views/admin/Orders.js";
import OrderNew from "views/admin/OrderNew.js";

import Clients from "views/admin/Clients.js";
import ClientNew from "views/admin/ClientNew.js";
import BrandsModels from "views/admin/BrandsModels.js";
import BrandNew from "views/admin/BrandNew.js";
import ModelNew from "views/admin/ModelNew.js";
import Technicals from "views/admin/Technicals.js";
import TechnicalNew from "views/admin/TechnicalNew.js";
import FaultsSolutions from "views/admin/FaultsSolutions.js";
import FaultNew from "views/admin/FaultNew.js";
import SolutionNew from "views/admin/SolutionNew.js";
import Order from "views/admin/Order.js";
import SimNew from "views/admin/SimNew.js";
import MsdNew from "views/admin/MsdNew.js"
import SimMsd from "views/admin/SimMsd"

import Status from "views/admin/Status";
import StatusNew from "views/admin/StatusNew";

import Devices from "views/admin/Devices"
import DeviceNew from "views/admin/DeviceNew"

export default function Admin() {

  return (
    <div>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={ Dashboard } />
            <Route path="/admin/orders" exact component={ Orders } />
            <Route path="/admin/order-new/:id" exact component={ OrderNew } />
            <Route path="/admin/order-new" exact component={ OrderNew } />
            <Route path="/admin/order" exact component={ Order } />

            <Route path="/admin/clients" exact component={ Clients } />
            <Route path="/admin/client-new" exact component={ ClientNew } />
            <Route path="/admin/client-new/:id" exact component={ ClientNew } />

            <Route path="/admin/faults-solutions" exact component={ FaultsSolutions } />
            <Route path="/admin/fault-new/:id" exact component={ FaultNew } />
            <Route path="/admin/fault-new" exact component={ FaultNew } />
            <Route path="/admin/solution-new/:id" exact component={ SolutionNew } />
            <Route path="/admin/solution-new" exact component={ SolutionNew } />

            <Route path="/admin/brands-models" exact component={ BrandsModels } />
            <Route path="/admin/brand-new/:id" exact component={ BrandNew } />
            <Route path="/admin/brand-new" exact component={ BrandNew } />
            <Route path="/admin/model-new/:id" exact component={ ModelNew } />
            <Route path="/admin/model-new" exact component={ ModelNew } />

            <Route path="/admin/sim-msd" exact component={ SimMsd } />
            <Route path="/admin/sim-new/:id" exact component={ SimNew } />
            <Route path="/admin/sim-new" exact component={ SimNew } />
            <Route path="/admin/msd-new/:id" exact component={ MsdNew } />
            <Route path="/admin/msd-new" exact component={ MsdNew } />

            <Route path="/admin/statuses" exact component={  Status  } />
            <Route path="/admin/status-new" exact component={  StatusNew  } />
            <Route path="/admin/status-new/:id" exact component={  StatusNew  } />
            
            <Route path="/admin/devices" exact component={ Devices } />
            <Route path="/admin/devices-new" exact component={ DeviceNew } />
            <Route path="/admin/devices-new/:id" exact component={ DeviceNew } />
            
            <Route path="/admin/technicals" exact component={ Technicals } />
            <Route path="/admin/technical-new" exact component={ TechnicalNew } />
            <Route path="/admin/technical-new/:id" exact component={ TechnicalNew } />
            
            
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </div>
  );
}
