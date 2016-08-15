class ShipmentsController < ApplicationController
  def index
  	@shipments = Shipment.order(params[:sort])
  end

  def import
  	Shipment.import(params[:file])
  	redirect_to root_url, notice: "Shipments imported."
  end
end
