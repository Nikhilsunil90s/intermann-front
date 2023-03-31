import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import { GetRoute } from "../../components/ApisFunction/FunctionsApi";
import Error404Loader from "../../components/Loader/404Error";
let id = [] as any;
function BillingCenter() {
  const [data, setData] = useState([]);
  const [onClickRowActive, setActive] = useState([]);
  const [multiSelect, setMultiselect] = useState(false) as any;
  const [error, setError] = useState(true);
  useEffect(() => {
    GetRoute("getAllInvoices")
      .then((res) => {
        if (res.status) {
          setData([...res.data]);
          setError(true);
        } else if (res.status == 401) {
          setError(false);
        }
        // console.log(res);
      })
      .catch((err) => {
        setError(false);
      });
  }, []);

  //   useEffect(() => {
  //     GetRoute("getAllInvoices").then((res) => {
  //       console.log(res);
  //     });
  //   },[]);

  const isMulti = (e) => {
    if (e.target.checked) {
      data.map((el) => {
        if(!JSON.stringify(id).includes(JSON.stringify(el._id))){
          id.push(el._id);
          setActive(id)
        }else{
       
        }
        // 
      });
      setMultiselect(true);
    } else {
      setActive([])
      id = [];
      setMultiselect(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="p-0">
            <Header props={"header"} />
          </div>
          <div className="p-0">
            <Header props={"Tabs"} />
          </div>

          <div className="col-12 mt-2">
            <div className="row">
              {data.length > 0 ? (
                <table className="table billingTable">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div className="justify-content-start">
                          <label className="InputContainer">
                            <input
                              type="checkbox"
                              onClick={(e) => isMulti(e)}
                              checked={multiSelect ? true : false}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </th>
                      <th scope="col">#</th>
                      <th scope="col">Client</th>
                      <th scope="col">Émission/ Date d’échéance</th>
                      <th scope="col">Montant</th>
                      <th scope="col">status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((el, i) => (
                      <Card
                        props={el}
                        index={i}
                        key={i}
                        setActive={setActive}
                        onClickRowActive={onClickRowActive}
                        setMultiselect={setMultiselect}
                        multiSelect={multiSelect}
                        id={id}
                      />
                    ))}
                  </tbody>
                </table>
              ) : null}

              {error ? (
                data.length > 0 ? null : (
                  <div className="col-12 d-flex justify-content-center mt-2">
                    <span className="billingLoader" />
                  </div>
                )
              ) : (
                <div className="col-12 d-flex justify-content-center">
                  <Error404Loader props={"38%"} />
                </div>
              )}
            </div>
          </div>
          {/* <div className="col-12 ">
<div className="row Billing_Footer">

</div>
              </div> */}
        </div>
      </div>
    </>
  );
}
export default BillingCenter;
