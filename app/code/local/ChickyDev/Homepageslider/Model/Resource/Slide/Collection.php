<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 1/1/2017
 * Time: 10:27 AM
 */ 
class ChickyDev_Homepageslider_Model_Resource_Slide_Collection extends Mage_Core_Model_Resource_Db_Collection_Abstract
{

    protected function _construct()
    {
        $this->_init('chickydev_homepageslider/slide');
    }

}