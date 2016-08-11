class Shipment < ActiveRecord::Base
	require 'csv'
#check to see if the product already exists in the database. 
#if it does, it will then attempt to update the existing product. 
#If not, it will attempt to create a new product.
	def self.import(file)
		CSV.foreach(file.path, headers: true) do |row|

			shipment_hash = row.to_hash
			shipment = Shipment.where(id: shipment_hash["id"])

			if shipment.count == 1
				shipment.first.update_attributes(shipment_hash)
			else 
				Shipment.create!(shipment_hash)
			end
		end
	end
end
