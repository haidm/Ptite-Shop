<?php
class ChickyDev_RemoteCart_Model_Observer
{
    public function catalogProductLoadAfter(Varien_Event_Observer $observer)
    {
        // set the additional options on the product
        $action = Mage::app()->getFrontController()->getAction();
        if ($action->getFullActionName() == 'checkout_cart_add')
        {
            // assuming you are posting your custom form values in an array called extra_options...
            if ($options = $action->getRequest()->getParams())
            {
                $product = $observer->getProduct();

                // add to the additional options array
                $additionalOptions = array();
                foreach ($options as $key => $value)
                {
                    if ($key != 'qty') {
                        $additionalOptions[] = array(
                            'label' => $key,
                            'value' => $value,
                        );
                    }
                }
                // add the additional options array with the option code additional_options
                $observer->getProduct()
                    ->addCustomOption('additional_options', serialize($additionalOptions));

                if (!isset($options['typeofproduct'])) {
                    $quoteId = Mage::getSingleton("checkout/cart")->getQuote()->getId();
                    $feeinfo = Mage::getModel('chickydev_remotecart/feeinfo')->load($quoteId);
                    $info = unserialize($feeinfo->getInfo());
                    $info['muahang'] = 1;
                    $feeinfo->setInfo(serialize($info));
                    $feeinfo->save();
                }
            }
        }
    }

    public function salesConvertQuoteToOrder($observer)
    {
        $order = $observer->getEvent()->getOrder();
        $quote = Mage::getSingleton("checkout/cart")->getQuote();
        $order->setFee($quote->getFee());
        $order->setBaseFee($quote->getBaseFee());
        $order->setGrandTotal($quote->getGrandTotal());
        $order->setBaseGrandTotal($quote->getBaseGrandTotal());
    }
}