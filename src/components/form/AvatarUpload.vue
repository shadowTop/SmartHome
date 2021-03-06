<template lang="pug">
el-upload(list-type="picture-card" show-file-list :limit="1"
	:on-remove = "handleAvatarRemove"
  :before-upload="beforeAvatarUpload" :http-request="handleUpLoad" ref="avatar")
	i.el-icon-plus
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator'
import tip from '@/utils/ui/tip'
import { Message } from 'element-ui'

@Component({
	props:{
		isInit:Boolean
	}
})
export default class AvatarUpload extends Vue {

	@Watch('isInit')
	toInit(value, oldValue) {
		this.$refs.avatar.clearFiles()
	}

	beforeAvatarUpload(file) {
		const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'
		const isLt2M = file.size / 1024 / 1024 < 2

		if (!isJPGorPNG) {
			tip.warning('上传头像图片只能是 JPG 或 PNG 格式!')
		}
		if (!isLt2M) {
			tip.warning('上传头像图片大小不能超过 2MB!')
		}
		return isJPGorPNG && isLt2M
	}

	handleUpLoad(request) {
		if (!request.file) {
			return tip.error('请重新上传头像！')
		}
		this.$emit('update:avatar', request.file)
	}

	handleAvatarRemove() {
		this.$emit('update:avatar', null)
	}
}
</script>

<style lang="stylus">
	imgSize = 80px;

	.el-upload--picture-card {
		transform: translate(-45%, -150%);
	}

	.el-upload-list__item {
		width: imgSize !important;
		height: imgSize !important;
		transform: translate(-67%, -150%);
		z-index: 999 !important;
		border: none !important;
		outline: none !important;
	}

	.el-upload-list__item, .el-upload--picture-card {
		position: absolute !important;
		border-radius: 50% !important;
		box-shadow: 0 0 2px 3px rgba(255, 255, 255, 0.7), 0 0 30px 8px #f6f6f6;
		cursor: pointer;
	}

	.el-upload, .el-upload-list__item-actions, .el-upload-list__item-status-label {
		border-radius: 50% !important;
	}

	.el-upload-list__item-status-label {
		display: none !important;
	}

	.el-upload--picture-card, .el-upload {
		transition: all 0.5s !important;

		&:hover {
			border-radius: 40% !important;
			box-shadow: 1px 2px 30px 0 rgba(0, 0, 0, 0.19), 0 5px 30px -2px #d3d3d3, 0 1px 5px 0 rgba(0, 0, 0, 0.15);

			.avatar-tip {
				opacity: 1;
				transform: translateX(-1.8vw) translateY(-5%);
			}

			.el-icon-plus {
				transform: translateY(-95%);
				text-shadow: 1px 1px 5px #ccc;
			}
		}
	}

	.el-upload--picture-card:hover, .el-upload:focus {
		color: none !important;
	}

	.avatar-tip {
		position: absolute;
		width: 38%;
		transform: translateX(-1.8vw) translateY(10%);
		opacity: 0;
		transition: 0.3s;
		color: #666;
		text-shadow: 1px 1px 5px #999;
	}

	.el-upload {
		width: imgSize !important;
		height: imgSize !important;
	}

	.el-upload-ist__item-status-label, .el-icon-close-tip {
		display: none !important;
	}

	.el-upload-list__item {
		margin-left: 1.1vw !important;
	}

	.el-icon-plus {
		color: skyblue !important;
		transform: translateY(-103%);
		transition: all 0.2s;
		text-shadow: 1px 1px 2px #ccc;
	}

	.el-upload-list__item-preview {
		display: none !important;
	}

	.el-upload-list__item-delete {
		margin-left: -4px !important;
		transform: scale(1.5);
	}
</style>
