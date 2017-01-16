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
    ->addColumn($installer->getTable('sales/quote'),'feeinfo', array(
        'type'      => Varien_Db_Ddl_Table::TYPE_TEXT,
        'nullable'  => false,
        'length'    => 255,
        'comment'   => 'Fee Info'
    ));
$installer->getConnection()
    ->addColumn($installer->getTable('sales/order'),'feeinfo', array(
        'type'      => Varien_Db_Ddl_Table::TYPE_TEXT,
        'nullable'  => true,
        'length'    => 255,
        'comment'   => 'Fee Info'
    ));

$installer->endSetup();
