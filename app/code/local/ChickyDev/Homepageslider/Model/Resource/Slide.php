<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 1/1/2017
 * Time: 10:27 AM
 */ 
class ChickyDev_Homepageslider_Model_Resource_Slide extends Mage_Core_Model_Resource_Db_Abstract
{

    protected function _construct()
    {
        $this->_init('chickydev_homepageslider/homeslide', 'id');
    }

}