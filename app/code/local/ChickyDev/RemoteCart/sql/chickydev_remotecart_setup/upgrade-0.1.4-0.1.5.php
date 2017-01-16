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

$table = $installer->getConnection()
    ->newTable('feeinfo')
    ->addColumn('quote_id', Varien_Db_Ddl_Table::TYPE_INTEGER, null, array(
        'identity' => true,
        'primary' => true,
        'nullable' => false,
        'unsigned' => true,
        'increment' => true,
    ), 'quote id')
    ->addColumn('order_id', Varien_Db_Ddl_Table::TYPE_INTEGER, null, array(
        'nullable' => true,
    ), 'order id')
    ->addColumn('info', Varien_Db_Ddl_Table::TYPE_TEXT, '64k', array(), 'info');

$installer->getConnection()->createTable($table);

$installer->endSetup();
