<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 12/2/2016
 * Time: 3:19 PM
 */ 
/* @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$installer->startSetup();

$installer->getConnection()
    ->addColumn($installer->getTable('sales/quote_address'),'base_fee', array(
        'type'      => Varien_Db_Ddl_Table::TYPE_FLOAT,
        'nullable'  => false,
        'length'    => 10,
        'comment'   => 'Base Fee'
    ));
$installer->getConnection()
    ->addColumn($installer->getTable('sales/quote_address'),'fee', array(
        'type'      => Varien_Db_Ddl_Table::TYPE_FLOAT,
        'nullable'  => false,
        'length'    => 10,
        'comment'   => 'Fee'
    ));

$installer->endSetup();