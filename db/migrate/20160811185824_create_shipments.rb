class CreateShipments < ActiveRecord::Migration
  def change
    create_table :shipments do |t|
      t.timestamp :datetime
      t.string :origin
      t.string :destination
      t.decimal :shipment_value

      t.timestamps null: false
    end
  end
end
