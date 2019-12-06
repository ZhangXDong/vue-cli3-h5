//	加密 两种加密方式本质上是一样的
import crypto from 'crypto'
import md5 from 'js-md5'

const md5Obj = {
	encryption: function(val, salt) {
		let newVal = val + ''
		const sha256 = require("js-sha256").sha256 //引入sha256库
		newVal = md5(val)
		newVal += salt
		return newVal = sha256(newVal)
	}
}

const encryptObj = {
	encryption: function(val, salt) {
		let newVal = val + ''
		const md5 = crypto.createHash("md5")
		const sha256 = require("js-sha256").sha256 //引入sha256库
		md5.update(newVal)
		newVal = md5.digest('hex')
		newVal += salt
		return newVal = sha256(newVal)
	}
}

export {md5Obj, encryptObj}