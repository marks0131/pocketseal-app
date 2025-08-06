import React from 'react';

const GeneralSettingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold">Application settings</h2>
          
          <div className="form-control w-full max-w-sm">
            <label className="label">
              <span className="label-text">Snapshot interval</span>
            </label>
            <input type="text" placeholder="5m" className="input input-bordered w-full" />
          </div>

          <div className="form-control w-full max-w-sm mt-4">
            <label className="label">
              <span className="label-text">Edge agent default poll frequency</span>
            </label>
            <select className="select select-bordered">
              <option>5 seconds</option>
              <option>10 seconds</option>
            </select>
          </div>
          
          <div className="form-control w-full max-w-sm mt-4">
            <label className="label cursor-pointer">
              <span className="label-text">Use custom logo</span>
              <input type="checkbox" className="toggle toggle-primary" />
            </label>
          </div>

          <div className="form-control w-full max-w-sm mt-4">
            <label className="label cursor-pointer">
              <span className="label-text">Allow the collection of anonymous statistics</span>
              <input type="checkbox" className="toggle toggle-primary" defaultChecked />
            </label>
            <p className="text-sm text-base-content/70">
              You can find more information about this in our <a href="#" className="link link-hover">privacy policy</a>.
            </p>
          </div>

          <div className="form-control mt-6">
            <label className="label">
              <span className="label-text">App Templates</span>
              <a href="#" className="label-text-alt link link-hover">See Portainer documentation for more details.</a>
            </label>
            <p className="text-sm text-base-content/70">
              You can specify the URL to your own template definitions file here.
            </p>
            <input type="url" className="input input-bordered w-full mt-2" defaultValue="https://raw.githubusercontent.com/portainer/templates/v2/templates.json" />
          </div>
          
          <div className="card-actions justify-start mt-6">
            <button className="btn btn-primary">Save application settings</button>
          </div>
        </div>
      </div>
      
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-xl font-semibold">Kubernetes settings</h2>
          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Helm repository</span>
            </label>
            <input type="url" className="input input-bordered w-full" defaultValue="https://charts.bitnami.com/bitnami" />
          </div>
          <div className="card-actions justify-start mt-6">
            <button className="btn btn-primary">Save Helm settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettingsPage;