import { type SearchParams } from 'meilisearch'

import { meilisearch } from '@/utils/meilisearch'

const meilisearchCommand = {
  async searchProduct(q: string, params?: SearchParams) {
    try {
      const result =
        await meilisearch.productIndex.search<Meilisearch.ProductDocument>(
          q,
          params,
        )

      return result
    } catch {
      console.log('mock results')
      return mockMeilisearchResults
    }
  },
}

export default meilisearchCommand

const mockMeilisearchResults = {
  hits: [
    {
      id: '479cdd45-d6d5-46ed-a00d-baf7b084ba06',
      title: 'บริการออกแบบโลโก้ | MODERN | MINIMAL | LUXURY | BRAND CI',
      description:
        'บริการออกแบบโลโก้แบบมืออาชีพ ด้วยประสบการณ์กว่า 7 ปี ที่ช่วยให้แบรนด์ของคุณโดดเด่นและมีเอกลักษณ์เฉพาะตัว สะท้อนภาพลักษณ์และวิสัยทัศน์ขององค์กรได้ชัดเจน ช่วยให้ธุรกิจเติบโต สร้างความประทับใจและเป็นที่จดจำ',
      images_alt: {
        image_0:
          'รับออกแบบโลโก้ บริษัท สร้างสรรค์  Bankhai  โลโก้สไตล์เรียบหรูดูแพง',
        image_1: 'ออกแบบโลโก้ บ้านเมฆน้อย สไตล์เรียบหรู Minimal ดูแพง',
        image_2: 'รับออกแบบโลโก้ สไตล์มินิมอล สวยเรียบหรูดูแพง',
      },
      images: [
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/508861d4-e645-4eb5-af0d-9236e6053f3a.jpg',
          sort_order: -1,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/508861d4-e645-4eb5-af0d-9236e6053f3a.jpg',
          sort_order: 0,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/3d71ae91-e6f2-45f5-abcd-e96e5d382281.jpg',
          sort_order: 1,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/af003dd9-18ce-429f-8586-d6b44bc143f3.jpg',
          sort_order: 2,
        },
      ],
      attributes: {},
      badges: [],
      badges_new: [],
      base_price: 4900,
      category: {
        id: 'f4d22516-d963-4a18-ab1e-ee8ec835f352',
        slug: 'design-graphic',
        title: 'ออกแบบกราฟิก',
      },
      default_score: 242,
      image:
        'https://storage.googleapis.com/fastwork-static/6c6f64a0-cac7-47c8-9bfb-09315729eec7.jpg',
      last_online_at: null,
      last_sync: 1754652960,
      option_images: [],
      photos: [
        {
          alt: 'รับออกแบบโลโก้ บริษัท สร้างสรรค์  Bankhai  โลโก้สไตล์เรียบหรูดูแพง',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/6c6f64a0-cac7-47c8-9bfb-09315729eec7.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/508861d4-e645-4eb5-af0d-9236e6053f3a.jpg',
          is_cover_photo: true,
          sort_order: -1,
          type: 'image',
          video_id: '',
        },
        {
          alt: 'รับออกแบบโลโก้ บริษัท สร้างสรรค์  Bankhai  โลโก้สไตล์เรียบหรูดูแพง',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/6c6f64a0-cac7-47c8-9bfb-09315729eec7.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/508861d4-e645-4eb5-af0d-9236e6053f3a.jpg',
          is_cover_photo: false,
          sort_order: 0,
          type: 'image',
          video_id: '',
        },
        {
          alt: 'ออกแบบโลโก้ บ้านเมฆน้อย สไตล์เรียบหรู Minimal ดูแพง',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/1765560c-755c-4c93-8d0f-e0286b8c2785.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/3d71ae91-e6f2-45f5-abcd-e96e5d382281.jpg',
          is_cover_photo: false,
          sort_order: 1,
          type: 'image',
          video_id: '',
        },
        {
          alt: 'รับออกแบบโลโก้ สไตล์มินิมอล สวยเรียบหรูดูแพง',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/ffe9d4ba-abc3-404a-aae6-1a030653e1a6.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/af003dd9-18ce-429f-8586-d6b44bc143f3.jpg',
          is_cover_photo: false,
          sort_order: 2,
          type: 'image',
          video_id: '',
        },
      ],
      product_card_decor: {
        badge_images: [],
        border: null,
        images: [],
      },
      purchase_count: 0,
      rating: 0,
      review_count: 0,
      show: true,
      slug: 'logo-design-64010283',
      social_list: {},
      socials: [],
      special_score: 0,
      subcategory: {
        id: '8a6f479b-905a-47d4-9106-9d92d43e2677',
        slug: 'logo-design',
        title: 'Logo',
      },
      tags: ['โลโก้แบรนด์สินค้า', 'ฟรีสไตล์', 'JPG'],
      user: {
        display_name: 'Kai Exo. ติดต่อไลน์',
        first_name: 'ไค',
        image:
          'https://fw-fileupload-th-staging.s3.ap-southeast-1.amazonaws.com/users/501af740-e408-4c1e-b7f8-86b448bbd2db/profile/a0f9632f-e39d-4dd6-8463-4dd8c346f690.png',
        province: 'สมุทรปราการ',
        stats: {
          response_time: 661.5,
        },
        username: 'kai001',
      },
      category_id: 'f4d22516-d963-4a18-ab1e-ee8ec835f352',
      subcategory_id: '8a6f479b-905a-47d4-9106-9d92d43e2677',
      _rankingScore: 0.6539325714111328,
    },
    {
      id: 'a5611dc2-d632-4d42-8970-9d3321af5520',
      title: 'ออกแบบโลโก้สไตล์มินิมอล เรียบง่าย เท่มีสไตล์',
      description:
        'ออกแบบโลโก้ สไตล์ มินิมอล เรียบง่าย สะอาด และทันสมัย\nเราตั้งใจทำงาน มีประสบการณ์จริง ด้านการออกแบบ\nเน้นความเรียบง่าย เป็นที่น่าจดจำ\nรับประกันความสดใหม่ ไม่ซ้ำใครแน่นอน \n\n-----------------------------------------------------------------------------\n\nสิ่งที่ต้องเตรียมก่อนเริ่มงานมีดังนี้\n1. ชื่อแบรนด์\n2. สโลแกน (ถ้าต้องการใส่ใน Logo มีหรือไม่มีก็ได้)\n3. คำอธิบายสั้นๆ เกี่ยวกับธุรกิจ\n4. Logo สไตล์ที่ต้องการ\n5. สีที่ชอบ โทนสีของโลโกที่ต้องการ\n6. ตัวอย่างงานที่ชอบ แนวตัวอย่างงานที่ชอบ\n\nงานทุกชิ้นรับประกันความพึงพอใจ 100%',
      images_alt: {
        image_0: '',
        image_1: '',
        image_10: '',
        image_11: '',
        image_12: '',
        image_13: '',
        image_14: '',
        image_15: '',
        image_16: '',
        image_17: '',
        image_18: '',
        image_2: '',
        image_3: '',
        image_4: '',
        image_5: '',
        image_6: '',
        image_7: '',
        image_8: '',
        image_9: '',
      },
      images: [
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/6c8bf262-cc45-48aa-96c4-29aa44039850.jpg',
          sort_order: -1,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/dca45b91-7bf8-4785-a13f-9ac0f6765e1a.jpg',
          sort_order: 0,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/80c11b69-42cd-429e-92e7-4c79575029f1.jpg',
          sort_order: 1,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/641f281b-4401-495b-a663-db47f7b0c924.jpg',
          sort_order: 2,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/7ad2e750-4baf-4c0a-9640-96992078d73e.jpg',
          sort_order: 3,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/bd43decb-bbf4-4821-af18-55b66f65145f.jpg',
          sort_order: 4,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/7288508c-7f44-427c-9af9-779b89bc6a3e.jpg',
          sort_order: 5,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/37dcb57d-2693-4f44-b75b-c5479e31dbb5.jpg',
          sort_order: 6,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/c645264a-afa6-4c22-9a90-4158c835bb2f.jpg',
          sort_order: 7,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/576660da-ffaa-4be9-b392-61f629bcbd9d.jpg',
          sort_order: 8,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/1c020a6b-2320-422d-9c25-be0b07c0b4c2.jpg',
          sort_order: 9,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/cd9285b4-89d6-4b36-8619-88712d8b55e5.jpg',
          sort_order: 10,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/9c0ddb28-90ab-44da-ab7d-9dc6310d72bb.jpg',
          sort_order: 11,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/512f6fbb-10b0-4b0f-be3a-7c2394249a6a.jpg',
          sort_order: 12,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/19bf77d7-7864-4e0d-896a-d52bf49ddb05.jpg',
          sort_order: 13,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/8f474201-505e-44eb-886b-41e3f6ba17e1.jpg',
          sort_order: 14,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/2925b3c8-249d-4086-8074-02f699a41530.jpg',
          sort_order: 15,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/ae50af63-9dec-4555-b312-a9cb7a40d25a.jpg',
          sort_order: 16,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/a54f42c5-6b54-4b3e-a049-eafd67c76491.jpg',
          sort_order: 17,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/cfd40aaf-e7e8-4c80-90df-4307cb8cfe40.jpg',
          sort_order: 18,
        },
      ],
      attributes: {},
      badges: [],
      badges_new: [],
      base_price: 2500,
      category: {
        id: 'f4d22516-d963-4a18-ab1e-ee8ec835f352',
        slug: 'design-graphic',
        title: 'Graphic & Design',
      },
      default_score: 204,
      image:
        'https://storage.googleapis.com/fastwork-static/47c88b03-de78-4d8e-8a01-e0fb1842a630.jpg',
      last_online_at: null,
      last_sync: 1750230297,
      option_images: [],
      photos: [
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/47c88b03-de78-4d8e-8a01-e0fb1842a630.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/6c8bf262-cc45-48aa-96c4-29aa44039850.jpg',
          is_cover_photo: true,
          sort_order: -1,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/f2c004e4-ae36-4eb6-ad38-33188a76740f.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/dca45b91-7bf8-4785-a13f-9ac0f6765e1a.jpg',
          is_cover_photo: false,
          sort_order: 0,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/b6176433-e01f-4bad-8c8b-7fe5f0189206.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/80c11b69-42cd-429e-92e7-4c79575029f1.jpg',
          is_cover_photo: false,
          sort_order: 1,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/bff823be-4446-4cde-bc09-cfaef2d7e433.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/641f281b-4401-495b-a663-db47f7b0c924.jpg',
          is_cover_photo: false,
          sort_order: 2,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/cb32df34-22a2-4bc9-ab43-24dddd48e0a8.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/7ad2e750-4baf-4c0a-9640-96992078d73e.jpg',
          is_cover_photo: false,
          sort_order: 3,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/cf4f4762-1ecd-4ea8-b64d-edeb22303d2f.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/bd43decb-bbf4-4821-af18-55b66f65145f.jpg',
          is_cover_photo: false,
          sort_order: 4,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/a3a66d1f-8d92-47bd-8185-64154d8cf6ce.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/7288508c-7f44-427c-9af9-779b89bc6a3e.jpg',
          is_cover_photo: false,
          sort_order: 5,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/f1798f24-43ce-4635-bce9-319fc7e6251b.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/37dcb57d-2693-4f44-b75b-c5479e31dbb5.jpg',
          is_cover_photo: false,
          sort_order: 6,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/3cb6133e-f710-456e-8b55-eb5b2ee63922.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/c645264a-afa6-4c22-9a90-4158c835bb2f.jpg',
          is_cover_photo: false,
          sort_order: 7,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/ff3d2ce3-59ca-4477-9e89-def27403ffbf.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/576660da-ffaa-4be9-b392-61f629bcbd9d.jpg',
          is_cover_photo: false,
          sort_order: 8,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/4729f7ff-2976-498b-90f4-f3ff624db7bc.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/1c020a6b-2320-422d-9c25-be0b07c0b4c2.jpg',
          is_cover_photo: false,
          sort_order: 9,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/989daadb-b79a-48a7-a9eb-8c5a68fe380c.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/cd9285b4-89d6-4b36-8619-88712d8b55e5.jpg',
          is_cover_photo: false,
          sort_order: 10,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/093c9320-76b4-4cab-beab-ac27c13dfe15.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/9c0ddb28-90ab-44da-ab7d-9dc6310d72bb.jpg',
          is_cover_photo: false,
          sort_order: 11,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/397f8b97-ec0f-4818-b255-2c6952937d13.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/512f6fbb-10b0-4b0f-be3a-7c2394249a6a.jpg',
          is_cover_photo: false,
          sort_order: 12,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/6d1b7566-e4f4-47a2-a790-ef64f9b36c5c.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/19bf77d7-7864-4e0d-896a-d52bf49ddb05.jpg',
          is_cover_photo: false,
          sort_order: 13,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/7c2f9138-9334-4a52-974c-4c4078f8f2a9.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/8f474201-505e-44eb-886b-41e3f6ba17e1.jpg',
          is_cover_photo: false,
          sort_order: 14,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/2728cee8-b873-48ff-bed2-65cf9012e1f6.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/2925b3c8-249d-4086-8074-02f699a41530.jpg',
          is_cover_photo: false,
          sort_order: 15,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/318a4d2e-dbc3-4286-9962-0107a17ce662.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/ae50af63-9dec-4555-b312-a9cb7a40d25a.jpg',
          is_cover_photo: false,
          sort_order: 16,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/27931fb4-4889-4610-92ec-fa81bc0d2c2c.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/a54f42c5-6b54-4b3e-a049-eafd67c76491.jpg',
          is_cover_photo: false,
          sort_order: 17,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/2ab06c72-ea68-492f-8503-a68b62f35d72.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/cfd40aaf-e7e8-4c80-90df-4307cb8cfe40.jpg',
          is_cover_photo: false,
          sort_order: 18,
          type: 'image',
          video_id: '',
        },
      ],
      product_card_decor: {
        badge_images: [],
        border: null,
        images: [],
      },
      purchase_count: 29,
      rating: 4.48,
      review_count: 10,
      show: true,
      slug: 'logo-design-94967537',
      social_list: {},
      socials: [],
      special_score: 0,
      subcategory: {
        id: '8a6f479b-905a-47d4-9106-9d92d43e2677',
        slug: 'logo-design',
        title: 'Logo',
      },
      tags: [],
      user: {
        display_name: 'tgwzxsqz',
        first_name: 'Adisorn',
        image:
          'https://storage.googleapis.com/fastwork-static/bef539e3-4fdf-4fd9-a7e0-d6b8a09be00c.jpg',
        province: 'มุกดาหาร',
        stats: {
          response_time: null,
        },
        username: 'tgwzxsqz',
      },
      category_id: 'f4d22516-d963-4a18-ab1e-ee8ec835f352',
      subcategory_id: '8a6f479b-905a-47d4-9106-9d92d43e2677',
      _rankingScore: 0.6391606330871582,
    },
    {
      id: 'b2c3a093-30b3-40a5-9a57-4fc7eb4ee331',
      title: 'ออกแบบโลโก้มีอัตลักษณ์ให้ทุกคนจดจำ',
      description:
        'โลโก้คือสัญลักษณ์ที่แสดงถึงเอกลักษณ์ของแบรนด์และรู้จักกันดีในหมู่ผู้พบเห็น เป็นพื้นฐานสำหรับกลยุทธ์การตลาดที่มีประสิทธิภาพที่สร้างความสัมพันธ์กับกลุ่มเป้าหมาย  นอกจากจะแฝงเร้นด้วยนัยยะความหมาย ยังต้องกลมกลืน ลงตัว และมีรสนิยม สามารถนำไปต่อยอดแบรนด์ สร้าง CI ของแบรนด์ สร้างภาพลักษณ์เป็นที่จดจำให้กับผู้พบเห็น\n\nก่อนเริ่มงานลูกค้าต้องเตรียมข้อมูลดังนี้\n1. ชื่อแบรนด์\n2. คำอธิบายสั้นๆ เกี่ยวกับธุรกิจ\n3. logo สไตล์ที่ต้องการ\n4. สีที่ชอบ โทนสีของโลโกที่ต้องการ\n5. ตัวอย่างงานที่ชอบ แนวตัวอย่างงานที่ชอบ\n6. ถ้ามีภาพร่างหรือสเกตช์สามารถแนบไฟล์ส่งมาได้เลยครับ\n\n\nขั้นตอนการทำงาน\n1. ฟรีแลนซ์เสนอราคา\n2. ลูกค้าตกลงจ้างงาน พร้อมบรีฟงาน\n3.  ใช้ระยะเวลาออกแบบ 2 วันหลังจากตกลงจ้างงาน \n4. ส่งแบบ 3 แบบ ให้ลูกค้าเลือก 1 แบบกลับมาพัฒนา  พัฒนาแบบที่เลือกจนเสร็จ โดยแก้ไขตามแบบไม่ใช่การเปลี่ยนแบบไปเลย\n5. ส่งงานตามแบบที่ลูกค้าคอนเฟิร์มเป็น file JPEG, PNG, AI',
      images_alt: {
        image_0: '',
        image_1: '',
        image_2: '',
        image_3: '',
        image_4: '',
        image_5: '',
        image_6: '',
        image_7: '',
        image_8: '',
        image_9: '',
      },
      images: [
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/cc615242-ab70-4043-9c7d-ea53ac14a60e.jpg',
          sort_order: -1,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/426195a8-2ab2-4c6d-9966-6815d24b2e8f.jpg',
          sort_order: 0,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/83e2ded6-16ea-4cf1-b28a-e1004d541127.jpg',
          sort_order: 1,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/38dd83f8-7974-45a5-81f9-c7cc1eac2694.jpg',
          sort_order: 2,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/9ffd7570-92e2-48bc-8b0e-13e02b615ac2.jpg',
          sort_order: 3,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/82082e1f-94f2-463b-9200-a0b1049b9867.jpg',
          sort_order: 4,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/08632f87-2329-44c9-9a7f-acfcf52d1c97.jpg',
          sort_order: 5,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/ca16685c-12f0-44b6-8f39-c0e92bca165c.jpg',
          sort_order: 6,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/3cbeee46-728d-45aa-8dda-4967e64cf76b.jpg',
          sort_order: 7,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/f2e34d36-b5d5-4701-918b-c9c3cd42b8fe.jpg',
          sort_order: 8,
        },
        {
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/9323b9b1-5501-4281-85be-884d52eb741e.jpg',
          sort_order: 9,
        },
      ],
      attributes: {},
      badges: [],
      badges_new: [],
      base_price: 2500,
      category: {
        id: 'f4d22516-d963-4a18-ab1e-ee8ec835f352',
        slug: 'design-graphic',
        title: 'Graphic & Design',
      },
      default_score: 277,
      image:
        'https://storage.googleapis.com/fastwork-static/3f0fa8bd-4e3a-4dec-a0a1-97864c774a07.jpg',
      last_online_at: null,
      last_sync: 1750230355,
      option_images: [],
      photos: [
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/3f0fa8bd-4e3a-4dec-a0a1-97864c774a07.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/cc615242-ab70-4043-9c7d-ea53ac14a60e.jpg',
          is_cover_photo: true,
          sort_order: -1,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/d5a98248-650b-4375-b366-0874739f38a8.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/426195a8-2ab2-4c6d-9966-6815d24b2e8f.jpg',
          is_cover_photo: false,
          sort_order: 0,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/0e868e99-0f06-4009-b595-0ccdf58fda00.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/83e2ded6-16ea-4cf1-b28a-e1004d541127.jpg',
          is_cover_photo: false,
          sort_order: 1,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/741426e7-c8a3-40ae-92a3-6be4d5df8430.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/38dd83f8-7974-45a5-81f9-c7cc1eac2694.jpg',
          is_cover_photo: false,
          sort_order: 2,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/f9def1d3-3a66-47e4-b928-de7ada4e7169.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/9ffd7570-92e2-48bc-8b0e-13e02b615ac2.jpg',
          is_cover_photo: false,
          sort_order: 3,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/ee96edd9-8d6e-4e14-adbf-385b25786249.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/82082e1f-94f2-463b-9200-a0b1049b9867.jpg',
          is_cover_photo: false,
          sort_order: 4,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/d3ef3405-6e2d-4861-b728-b933729f1337.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/08632f87-2329-44c9-9a7f-acfcf52d1c97.jpg',
          is_cover_photo: false,
          sort_order: 5,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/efee6ecd-c2c8-4286-9df6-ebc4210a8f55.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/ca16685c-12f0-44b6-8f39-c0e92bca165c.jpg',
          is_cover_photo: false,
          sort_order: 6,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/09859dd0-24b7-4232-ba22-2137f36893cf.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/3cbeee46-728d-45aa-8dda-4967e64cf76b.jpg',
          is_cover_photo: false,
          sort_order: 7,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/925ec988-2e16-4a3c-a32e-e94e109e123d.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/f2e34d36-b5d5-4701-918b-c9c3cd42b8fe.jpg',
          is_cover_photo: false,
          sort_order: 8,
          type: 'image',
          video_id: '',
        },
        {
          alt: '',
          id: '',
          image_medium:
            'https://storage.googleapis.com/fastwork-static/f0d8ef46-9f8c-4536-bb8d-43991b3ba9f1.jpg',
          image_thumbnail:
            'https://storage.googleapis.com/fastwork-static/9323b9b1-5501-4281-85be-884d52eb741e.jpg',
          is_cover_photo: false,
          sort_order: 9,
          type: 'image',
          video_id: '',
        },
      ],
      product_card_decor: {
        badge_images: [],
        border: null,
        images: [],
      },
      purchase_count: 0,
      rating: 0,
      review_count: 0,
      show: true,
      slug: 'logo-design-57240828',
      social_list: {},
      socials: [],
      special_score: 0,
      subcategory: {
        id: '8a6f479b-905a-47d4-9106-9d92d43e2677',
        slug: 'logo-design',
        title: 'Logo',
      },
      tags: [],
      user: {
        display_name: 'artworkadd',
        first_name: 'Schwiz',
        image:
          'https://storage.googleapis.com/fastwork-static/2b3e9f12-6d32-4439-af08-8c4fcd5befc9.jpg',
        province: 'ชัยภูมิ',
        stats: {
          response_time: null,
        },
        username: 'artworkadd',
      },
      category_id: 'f4d22516-d963-4a18-ab1e-ee8ec835f352',
      subcategory_id: '8a6f479b-905a-47d4-9106-9d92d43e2677',
      _rankingScore: 0.6233217716217041,
    },
    {
      id: '54de266f-e1f1-40a8-9f93-8ff64d1ac98d',
      title: 'บริการออกแบบโลโก้สไตล์ Minimal',
      description: '',
      images_alt: {},
      images: [
        {
          image_thumbnail:
            'https://fw-fileupload-th-staging.s3.ap-southeast-1.amazonaws.com/products/54de266f-e1f1-40a8-9f93-8ff64d1ac98d/images/16118ca2-e285-464a-aad4-35ff0416fca5.jpg',
          sort_order: -1,
        },
      ],
      attributes: {},
      badges: [],
      badges_new: [],
      base_price: 1500,
      category: {
        id: 'f4d22516-d963-4a18-ab1e-ee8ec835f352',
        slug: 'design-graphic',
        title: 'ออกแบบกราฟิก',
      },
      default_score: null,
      image:
        'https://fw-fileupload-th-staging.s3.ap-southeast-1.amazonaws.com/products/54de266f-e1f1-40a8-9f93-8ff64d1ac98d/images/68678e4b-f87b-42bd-bf77-75cd4011ec99.jpg',
      last_online_at: null,
      last_sync: 1753258278,
      option_images: [],
      photos: [
        {
          alt: '',
          id: '',
          image_medium:
            'https://fw-fileupload-th-staging.s3.ap-southeast-1.amazonaws.com/products/54de266f-e1f1-40a8-9f93-8ff64d1ac98d/images/68678e4b-f87b-42bd-bf77-75cd4011ec99.jpg',
          image_thumbnail:
            'https://fw-fileupload-th-staging.s3.ap-southeast-1.amazonaws.com/products/54de266f-e1f1-40a8-9f93-8ff64d1ac98d/images/16118ca2-e285-464a-aad4-35ff0416fca5.jpg',
          is_cover_photo: true,
          sort_order: -1,
          type: 'image',
          video_id: '',
        },
      ],
      product_card_decor: {
        badge_images: [],
        border: null,
        images: [],
      },
      purchase_count: 0,
      rating: 0,
      review_count: 0,
      show: true,
      slug: 'logo-design-37014478',
      social_list: {},
      socials: [],
      special_score: 0,
      subcategory: {
        id: '8a6f479b-905a-47d4-9106-9d92d43e2677',
        slug: 'logo-design',
        title: 'Logo',
      },
      tags: [],
      user: {
        display_name: 'intreasseller',
        first_name: '',
        image:
          'https://fw-fileupload-th-staging.s3.ap-southeast-1.amazonaws.com/users/4ef05efd-8a11-429c-84df-a9fa1e6fc97f/profile/d90e89be-5a8d-4f37-bbd1-34848d959911.jpg',
        province: '',
        stats: null,
        username: 'intreasseller',
      },
      category_id: 'f4d22516-d963-4a18-ab1e-ee8ec835f352',
      subcategory_id: '8a6f479b-905a-47d4-9106-9d92d43e2677',
      _rankingScore: 0.616523265838623,
    },
  ],
  query: 'ออกแบบโลโก้ มินิมอล ร้านอาหาร',
  processingTimeMs: 890,
  limit: 4,
  offset: 0,
  estimatedTotalHits: 1544,
  semanticHitCount: 4,
}
