export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: (Rule: any) => Rule.required().email(),
      },
      {
        name: 'comment',
        title: 'Comment',
        type: 'text',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'post',
        title: 'Post',
        type: 'reference',
        to: [{ type: 'post' }],
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          calendarTodayLabel: 'Today',
        },
        initialValue: () => new Date().toISOString(),
      },
      {
        name: 'isApproved',
        title: 'Is Approved',
        type: 'boolean',
        description: 'Comments require approval before they show on the site',
        initialValue: false,
      }
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'comment',
        media: 'post.mainImage',
      },
      prepare({ title, subtitle, media }: any) {
        return {
          title,
          subtitle: subtitle.length > 50 ? subtitle.substring(0, 50) + '...' : subtitle,
          media,
        };
      },
    },
  }
  