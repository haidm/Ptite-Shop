<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 12/2/2016
 * Time: 3:19 PM
 */

class ChickyDev_RemoteCart_IndexController extends Mage_Core_Controller_Front_Action {

    public function addAction()
    {
        $params = $this->getRequest()->getParams();
        var_dump($params);die;
    }

    public function getratingAction()
    {
        header('Access-Control-Allow-Origin: *');
        echo Mage::getStoreConfig('remotecart/settings/rating');
    }

    public function clearAction()
    {
        Mage::getSingleton('checkout/cart')->truncate();
        Mage::getSingleton('checkout/cart')->save();
        $this->_redirect('checkout/cart');
    }

    public function updateluuyAction()
    {
        $params = $this->getRequest()->getParams();
        $quote = Mage::getSingleton('checkout/session')->getQuote();
        $cartItems = $quote->getAllVisibleItems();
        foreach ($cartItems as $item) {
            if ($item->getId() != $params['id']) {
                continue;
            }
            $options = $item->getProduct()->getCustomOption('info_buyRequest');
            $info = unserialize($options->getValue());
            $info['ghichu'] = $params['value'];
            $options->setValue(serialize($info));
            $options->save();
        }
    }

    public function updatequoteAction()
    {
        $params = $this->getRequest()->getParams();
        $quoteId = Mage::getSingleton("checkout/cart")->getQuote()->getId();
        $feeinfo = Mage::getModel('chickydev_remotecart/feeinfo')->load($quoteId);
        $info = unserialize($feeinfo->getInfo());
        if ($params['value'] == 1) {
            $info[$params['id']] = 1;
        } else {
            unset($info[$params['id']]);
        }
        $feeinfo->setInfo(serialize($info));
        $feeinfo->save();
        echo "OK";
    }

    public function getcurrentcartAction()
    {
        $count = Mage::helper('checkout/cart')->getSummaryCount();
        if (!$count) {
            echo '0';
        } else {
            echo $count;
        }
    }

    public function getloggedinAction()
    {
        if (Mage::getSingleton('customer/session')->isLoggedIn()) {
            echo "ok";
        } else {
            echo "notok";
        }
    }

    public function placeorderAction()
    {
        $quote = Mage::getSingleton("checkout/cart")->getQuote();
        $id = $quote->getId();
        $model = Mage::getModel('chickydev_remotecart/sales_service_quote', $quote);
        $order = $model->submitOrder();
        if($order && $order instanceof Mage_Sales_Model_Order){
            $session = Mage::getSingleton('checkout/session');
            $session->setLastSuccessQuoteId($id);
            $session->setLastQuoteId($id);
            $session->setLastOrderId($order->getId());
            echo "ok";
        } else {
            echo "not ok";
        }
    }
}